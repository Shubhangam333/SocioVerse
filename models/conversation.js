const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    recipients: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    text: String,
    media: Array,
    call: Object,
  },
  {
    timestamps: true,
  }
);

export const conversation = mongoose.model("conversation", conversationSchema);
