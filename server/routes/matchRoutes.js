import express from "express";

const router = express.Router();

// DEMO MATCH API
router.get("/:requestId", async (req, res) => {

  try {

    const donors = [

      {
        _id: 1,
        name: "Rahul Singh",
        bloodGroup: "A+",
        city: "Delhi",
        distance: "2 KM",
        match: "98%"
      },

      {
        _id: 2,
        name: "Aman Verma",
        bloodGroup: "A+",
        city: "Noida",
        distance: "4 KM",
        match: "95%"
      },

      {
        _id: 3,
        name: "Rohit Sharma",
        bloodGroup: "A+",
        city: "Ghaziabad",
        distance: "5 KM",
        match: "92%"
      }

    ];

    res.json({

      success: true,

      donors

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

});

export default router;