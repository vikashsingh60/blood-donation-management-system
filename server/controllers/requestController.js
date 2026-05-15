import Request from "../models/Request.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";
import sendSMS from "../utils/smsService.js"; // SMS utility

const generateRequestId = () => {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `BD-${random}`;
};

// CREATE REQUEST
export const createRequest = async (req, res) => {
  try {
    const request = await Request.create({
      ...req.body,
      patient: req.user._id,
      requestId: generateRequestId()
    });

    // Find matching donors by blood group
    const donors = await User.find({
      role: "donor",
      bloodGroup: request.bloodGroup,
      isAvailable: true
    });

    // Send SMS to each donor
    for (const donor of donors) {
      await sendSMS(
        donor.phone,
        `Emergency Blood Required
Blood Group: ${request.bloodGroup}
Location: ${request.location}
Request ID: ${request.requestId}`
      );

      // Create notification for donor
      await Notification.create({
        recipientId: donor._id,
        recipientRole: "donor",
        type: "blood_match",
        title: "Blood Request Match",
        message: `Urgent blood request for ${request.bloodGroup} at ${request.location}. Request ID: ${request.requestId}`,
        relatedId: request._id,
        relatedModel: "Request"
      });
    }

    // Notify all hospitals
    const hospitals = await User.find({ role: "hospital" });
    for (const hospital of hospitals) {
      await Notification.create({
        recipientId: hospital._id,
        recipientRole: "hospital",
        type: "new_request",
        title: "New Blood Request",
        message: `New blood request for ${request.bloodGroup} at ${request.location}. Request ID: ${request.requestId}`,
        relatedId: request._id,
        relatedModel: "Request"
      });
    }

    // Notify all admins
    const admins = await User.find({ role: "admin" });
    for (const admin of admins) {
      await Notification.create({
        recipientId: admin._id,
        recipientRole: "admin",
        type: "new_request",
        title: "New Blood Request Created",
        message: `Patient requested ${request.bloodGroup} blood. Location: ${request.location}. Request ID: ${request.requestId}`,
        relatedId: request._id,
        relatedModel: "Request"
      });
    }

    res.status(201).json({
      message: "Request created and notifications sent",
      request
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL REQUESTS
export const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate("patient", "name email");
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// MATCH BLOOD
export const matchBlood = async (req, res) => {
  try {
    const { bloodGroup } = req.params;
    const { location } = req.query;

    const bg = bloodGroup.toUpperCase();

    let query = {
      role: "donor",
      bloodGroup: bg,
      isAvailable: true
    };

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    const donors = await User.find(query).select("-password");

    res.json({
      total: donors.length,
      donors
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
