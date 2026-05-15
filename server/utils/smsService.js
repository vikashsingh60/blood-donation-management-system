import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH
);

const sendSMS = async (phone, message) => {
  try {
    // Normal SMS
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to: phone
    });

    // WhatsApp message
    await client.messages.create({
      from: "whatsapp:+14155238886", // Twilio sandbox WhatsApp number
      body: message,
      to: `whatsapp:${phone}`
    });
  } catch (error) {
    console.error("SMS sending failed:", error.message);
  }
};

export default sendSMS;
