import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { sendOTP } from "../utils/sendOTP.js";
import { verifyABHA } from "../utils/verifyABHA.js";
import { validateHospitalLicense } from "../utils/validateHospital.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const filteredBody = Object.fromEntries(
      Object.entries(req.body).filter(([, value]) => value !== "" && value !== null && value !== undefined)
    );

    const {
      name,
      email,
      password,
      phone,
      role,
      bloodGroup,
      age,
      lastDonationDate,
      healthDetails,
      abhaNumber,
      diseaseDetails,
      bloodRequirement,
      hospitalName,
      hospitalType,
      hospitalLicense,
      address,
      contactNumber
    } = filteredBody;

    if (role === "admin") {
      return res.status(403).json({ message: "Admin registration is not allowed publicly" });
    }

    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    if (role === "patient") {
      if (!name) {
        return res.status(400).json({ message: "Patient name is required" });
      }
      if (!abhaNumber || !/^[0-9]{12,14}$/.test(abhaNumber)) {
        return res.status(400).json({ message: "ABHA number must be 12-14 digits" });
      }
      if (!phone) {
        return res.status(400).json({ message: "Patient phone number is required" });
      }
      if (!diseaseDetails || !bloodRequirement) {
        return res.status(400).json({ message: "Disease details and blood requirement are required" });
      }
      const abhaValid = await verifyABHA(abhaNumber);
      if (!abhaValid) {
        return res.status(400).json({ message: "ABHA verification failed" });
      }
    }

    if (role === "donor") {
      if (!name || !bloodGroup || !age || !address) {
        return res.status(400).json({ message: "Donor registration requires name, blood group, age, and address" });
      }
      if (!phone && !email) {
        return res.status(400).json({ message: "Donor registration requires mobile or email" });
      }
      if (age < 18) {
        return res.status(400).json({ message: "Donor must be at least 18 years old" });
      }
    }

    if (role === "hospital") {
      if (!hospitalName || !hospitalType || !hospitalLicense || !address || !(contactNumber || phone)) {
        return res.status(400).json({ message: "Hospital registration requires hospital name, license, address, and contact number" });
      }
      const licenseValid = await validateHospitalLicense(hospitalLicense);
      if (!licenseValid) {
        return res.status(400).json({ message: "Hospital license validation failed" });
      }
    }

    if (!email && !phone) {
      return res.status(400).json({ message: "Email or mobile number is required for registration" });
    }

    if (email) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "User already exists with this email" });
      }
    }

    if (phone) {
      const phoneExists = await User.findOne({ phone });
      if (phoneExists) {
        return res.status(400).json({ message: "User already exists with this mobile number" });
      }
    }

    if (role === "patient") {
      const abhaExists = await User.findOne({ abhaNumber });
      if (abhaExists) {
        return res.status(400).json({ message: "ABHA number already registered" });
      }
    }

    const isPhoneOtpRegistration = phone && !password;
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const userData = {
      name: role === "hospital" ? hospitalName : name,
      email,
      password: hashedPassword,
      phone: role === "hospital" ? contactNumber || phone : phone,
      role,
      bloodGroup: role === "donor" ? bloodGroup : undefined,
      age: role === "donor" ? age : undefined,
      lastDonationDate: role === "donor" ? lastDonationDate : undefined,
      healthDetails: role === "donor" ? healthDetails : undefined,
      abhaNumber: role === "patient" ? abhaNumber : undefined,
      diseaseDetails: role === "patient" ? diseaseDetails : undefined,
      bloodRequirement: role === "patient" ? bloodRequirement : undefined,
      isAbhaVerified: role === "patient" ? true : undefined,
      hospitalName: role === "hospital" ? hospitalName : undefined,
      hospitalType: role === "hospital" ? hospitalType : undefined,
      hospitalLicense: role === "hospital" ? hospitalLicense : undefined,
      contactNumber: role === "hospital" ? contactNumber : undefined,
      address: role === "hospital" ? address : role === "donor" ? address : undefined,
      isHospitalVerified: role === "hospital" ? false : undefined,
      isAvailable: role === "donor" ? true : undefined,
      isVerified: !isPhoneOtpRegistration
    };

    const user = await User.create(userData);

    res.status(201).json({
      _id: user._id,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Duplicate entry" });
    }
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, phone, abhaNumber } = req.body;

    // Handle ABHA login for patients (legacy support)
    if (abhaNumber) {
      const user = await User.findOne({ abhaNumber, role: "patient" });
      if (!user) {
        return res.status(400).json({ message: "Invalid ABHA number" });
      }
      if (!user.phone) {
        return res.status(400).json({ message: "No phone number registered for this ABHA user" });
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.otp = otp;
      user.otpExpire = new Date(Date.now() + 10 * 60 * 1000);
      await user.save();

      const result = await sendOTP({ phone: user.phone, email: user.email, otp });
      if (!result.success) {
        return res.status(500).json({ message: "OTP could not be sent. Check Twilio or email configuration." });
      }

      const responsePayload = { message: "OTP sent", userId: user._id };
      if (result.method === "mock") {
        responsePayload.otp = otp;
      }
      return res.json(responsePayload);
    }

    // Handle mobile OTP login for any user with phone
    if (phone && !password) {
      const user = await User.findOne({ phone });
      if (!user) {
        return res.status(400).json({ message: "No user found with this mobile number" });
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.otp = otp;
      user.otpExpire = new Date(Date.now() + 10 * 60 * 1000);
      await user.save();

      const result = await sendOTP({ phone: user.phone, email: user.email, otp });
      if (!result.success) {
        return res.status(500).json({ message: "OTP could not be sent. Check Twilio or email configuration." });
      }

      const responsePayload = { message: "OTP sent", userId: user._id };
      if (result.method === "mock") {
        responsePayload.otp = otp;
      }
      return res.json(responsePayload);
    }

    // Handle email/password login
    if (email && password) {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const token = generateToken(user);
      res.json({
        user: {
          _id: user._id,
          email: user.email,
          role: user.role
        },
        token
      });
    } else {
      return res.status(400).json({ message: "Invalid login credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const user = await User.findById(userId);
    if (!user || user.otp !== otp || user.otpExpire < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();

    const token = generateToken(user);
    res.json({
      user: {
        _id: user._id,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// REQUEST OTP - Explicit endpoint for requesting OTP
export const requestOTP = async (req, res) => {
  try {
    const { abhaNumber, phone } = req.body;

    if (!abhaNumber && !phone) {
      return res.status(400).json({ message: "ABHA number or phone number is required" });
    }

    let user;
    if (abhaNumber) {
      user = await User.findOne({ abhaNumber, role: "patient" });
      if (!user) {
        return res.status(400).json({ message: "Invalid ABHA number" });
      }
    } else if (phone) {
      user = await User.findOne({ phone });
      if (!user) {
        return res.status(400).json({ message: "No user found with this phone number" });
      }
    }

    if (!user.phone) {
      return res.status(400).json({ message: "No phone number registered for this user" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpire = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    const result = await sendOTP({ phone: user.phone, email: user.email, otp });
    if (!result.success) {
      return res.status(500).json({ 
        message: "OTP could not be sent. Check Twilio or email configuration." 
      });
    }

    const responsePayload = { 
      message: "OTP sent successfully", 
      userId: user._id,
      method: result.method
    };
    
    // For testing/development, include OTP if using mock method
    if (result.method === "mock") {
      responsePayload.otp = otp;
    }

    return res.json(responsePayload);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// RESEND OTP - Resend OTP to user
export const resendOTP = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.phone) {
      return res.status(400).json({ message: "No phone number registered for this user" });
    }

    // Check if user already has a valid OTP
    if (user.otp && user.otpExpire > new Date()) {
      // OTP still valid, don't generate a new one immediately
      return res.status(429).json({ 
        message: "OTP already sent. Please wait before requesting a new one.",
        expiresIn: Math.ceil((user.otpExpire - new Date()) / 1000) + " seconds"
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpire = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    const result = await sendOTP({ phone: user.phone, email: user.email, otp });
    if (!result.success) {
      return res.status(500).json({ 
        message: "OTP could not be sent. Check Twilio or email configuration." 
      });
    }

    const responsePayload = { 
      message: "OTP resent successfully", 
      method: result.method
    };
    
    if (result.method === "mock") {
      responsePayload.otp = otp;
    }

    return res.json(responsePayload);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};