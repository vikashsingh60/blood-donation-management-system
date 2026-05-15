import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // COMMON FIELDS
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
      required: function () {
        return !this.phone;
      }
    },

    provider: {
      type: String,
      enum: ["google", "facebook", "linkedin"],
      default: undefined
    },

    providerId: {
      type: String,
      unique: true,
      sparse: true
    },

    password: {
      type: String,
      required: function () {
        return !this.phone;
      }
    },

    phone: {
      type: String,
      unique: true,
      sparse: true,
      required: function () {
        return !this.email;
      }
    },

    role: {
      type: String,
      enum: [
        "admin",
        "patient",
        "donor",
        "hospital"
      ],
      default: "donor"
    },

    // BLOOD GROUP
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]
    },

    // DONOR SPECIFIC
    age: { type: Number },
    lastDonationDate: { type: Date },
    healthDetails: { type: String },

    // PATIENT SPECIFIC
    diseaseDetails: { type: String },
    bloodRequirement: { type: String },

    // LOCATION
    address: { type: String },
    city: { type: String },
    state: { type: String },
    location: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },

    // Availability flag for donors
    isAvailable: {
      type: Boolean,
      default: true
    },

    // PATIENT (ABHA)
    abhaNumber: {
      type: String,
      unique: true,
      sparse: true
    },

    // HOSPITAL
    hospitalName: { type: String },
    hospitalType: {
      type: String,
      enum: ["private", "government", "aiims"]
    },
    hospitalLicense: { type: String },
    contactNumber: { type: String },
    isHospitalVerified: { type: Boolean, default: false },

    // DONOR STATS
    donationCount: {
      type: Number,
      default: 0
    },
    priorityPoints: {
      type: Number,
      default: 0
    },

    isAbhaVerified: {
      type: Boolean,
      default: false
    },

    // VERIFICATION
    isVerified: {
      type: Boolean,
      default: false
    },
    otp: { type: String },
    otpExpire: { type: Date }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("User", userSchema);
