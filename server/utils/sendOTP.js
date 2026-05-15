import twilio from "twilio";
import nodemailer from "nodemailer";

const isPlaceholder = (value) => {
  return !value || value.startsWith("YOUR_") || value.includes("PLACEHOLDER");
};

const createEmailTransport = () => {
  const host = process.env.EMAIL_HOST;
  const port = process.env.EMAIL_PORT && Number(process.env.EMAIL_PORT);
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!host || !port || !user || !pass || isPlaceholder(host) || isPlaceholder(user) || isPlaceholder(pass)) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });
};

export const sendOTP = async ({ phone, email, otp }) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID || process.env.TWILIO_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN || process.env.TWILIO_AUTH;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER || process.env.TWILIO_PHONE;

  if (!phone && !email) {
    console.error("OTP sending failed: patient phone number and email are missing.");
    return { success: false, method: null };
  }

  if (!isPlaceholder(accountSid) && !isPlaceholder(authToken) && !isPlaceholder(fromNumber) && phone) {
    try {
      const client = twilio(accountSid, authToken);
      await client.messages.create({
        body: `Your BloodBank OTP is ${otp}. It expires in 10 minutes.`,
        from: fromNumber,
        to: phone
      });
      return { success: true, method: "sms" };
    } catch (error) {
      console.error("Twilio send failed:", error.message);
    }
  }

  const transporter = createEmailTransport();
  if (transporter && email) {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: email,
        subject: "Your BloodBank OTP Code",
        text: `Your BloodBank OTP is ${otp}. It expires in 10 minutes.`,
        html: `<p>Your BloodBank OTP is <strong>${otp}</strong>. It expires in 10 minutes.</p>`
      });
      return { success: true, method: "email" };
    } catch (error) {
      console.error("Email send failed:", error.message);
    }
  }

  console.log(`Mock OTP for ${phone || email}: ${otp}`);
  return { success: true, method: "mock" };
};
