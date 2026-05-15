import User from "../models/User.js";
import Request from "../models/Request.js";
import sendSMS from "../utils/smsService.js"; // SMS utility

// Helper function to calculate distance (Haversine formula)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // distance in km
};

export const matchDonors = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    // Find donors by blood group and availability, sorted by priorityPoints
    let donors = await User.find({
      role: "donor",
      bloodGroup: request.bloodGroup,
      isAvailable: true,
    })
      .select("-password")
      .sort({ priorityPoints: -1 });

    // If request has location (lat/lon), calculate distance
    let matchedDonors = donors;
    if (request.latitude && request.longitude) {
      matchedDonors = donors.map((donor) => {
        const distance = calculateDistance(
          donor.latitude,
          donor.longitude,
          request.latitude,
          request.longitude
        );
        return { ...donor._doc, distance };
      });

      // ✅ Nearby donors within 10 km
      matchedDonors = matchedDonors.filter((donor) => donor.distance < 10);

      // Sort donors by nearest distance (after priority sort)
      matchedDonors.sort((a, b) => a.distance - b.distance);
    }

    // ✅ Critical request SMS alert
    if (request.priority === "critical") {
      for (const donor of matchedDonors) {
        await sendSMS(
          donor.phone,
          `CRITICAL BLOOD EMERGENCY!
Blood Group: ${request.bloodGroup}
Location: ${request.location}
Request ID: ${request._id}`
        );
      }
    }

    res.json({
      success: true,
      total: matchedDonors.length,
      donors: matchedDonors,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
