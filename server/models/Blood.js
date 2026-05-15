import mongoose from "mongoose";

const bloodSchema = new mongoose.Schema(
  {
    bloodGroup: {
      type: String,

      required: true,

      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },

    quantity: {
      type: Number,

      required: true,

      default: 0,
    },

    hospital: {
      type: String,

      required: true,
    },

    hospitalType: {
      type: String,

      enum: ["private_hospital", "government_hospital", "aiims_pgi"],
    },

    location: {
      type: String,
    },

    minimumRequired: {
      type: Number,

      default: 5,
    },

    isCritical: {
      type: Boolean,

      default: false,
    },

    expiryDate: {
      type: Date,
    },
  },

  {
    timestamps: true,
  },
);

export default mongoose.model("Blood", bloodSchema);
