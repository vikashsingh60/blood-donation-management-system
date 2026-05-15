import Blood from "../models/Blood.js";

// ➕ Add Blood Stock
export const addBlood = async (req, res) => {
  try {
    const { bloodGroup, quantity, hospital, hospitalType, location, expiryDate } = req.body;

    // ✅ validation
    if (!bloodGroup || !quantity || !hospital) {
      return res.status(400).json({ message: "All fields required" });
    }

    let blood = await Blood.findOne({ bloodGroup, hospital });

    if (blood) {
      blood.quantity += Number(quantity);
      blood.expiryDate = expiryDate || blood.expiryDate;
      await blood.save();
    } else {
      blood = await Blood.create({
        bloodGroup,
        quantity,
        hospital,
        hospitalType,
        location,
        expiryDate
      });
    }

    res.status(201).json({ success: true, blood });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🩸 Use Blood Units
export const useBlood = async (req, res) => {
  try {
    const { bloodGroup, quantity, hospital } = req.body;

    const blood = await Blood.findOne({ bloodGroup, hospital });

    if (!blood) {
      return res.status(404).json({ message: "Blood not found" });
    }

    if (blood.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    blood.quantity -= quantity;
    await blood.save();

    res.json({ success: true, blood });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📋 Get All Inventory (non-expired)
export const getInventory = async (req, res) => {
  try {
    const inventory = await Blood.find({
      expiryDate: { $gte: new Date() }
    }).select("-__v");

    res.json({ success: true, inventory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔍 Get by Blood Group
export const getByGroup = async (req, res) => {
  try {
    const { group } = req.params;

    const data = await Blood.find({
      bloodGroup: group,
      expiryDate: { $gte: new Date() }
    }).select("-__v");

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📊 Get Total Stock
export const getTotalStock = async (req, res) => {
  try {
    const total = await Blood.aggregate([
      { $match: { expiryDate: { $gte: new Date() } } },
      { $group: { _id: "$bloodGroup", totalUnits: { $sum: "$quantity" } } }
    ]);

    res.json({ success: true, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ⚠️ AI Low Stock Detection
export const lowStockAlert = async (req, res) => {
  try {
    const lowStock = await Blood.find({
      $expr: { $lte: ["$quantity", "$minimumRequired"] }
    });

    res.json({ success: true, lowStock });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
