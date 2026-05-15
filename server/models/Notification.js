import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  recipientRole: {
    type: String,
    required: true,
    enum: ["patient", "donor", "hospital", "admin"]
  },
  type: {
    type: String,
    required: true,
    enum: ["request_status", "new_request", "blood_match", "emergency", "system"]
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  relatedId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "relatedModel"
  },
  relatedModel: {
    type: String,
    enum: ["Request", "User", "Blood"]
  },
  read: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient queries
notificationSchema.index({ recipientId: 1, recipientRole: 1, createdAt: -1 });

export default mongoose.model("Notification", notificationSchema);