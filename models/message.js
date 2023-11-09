import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversation: { type: mongoose.Types.ObjectId, ref: "conversation" },
    sender: { type: mongoose.Types.ObjectId, ref: "user" },
    recipient: { type: mongoose.Types.ObjectId, ref: "user" },
    text: String,
    media: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
    call: Object,
  },
  {
    timestamps: true,
  }
);

export const message = mongoose.model("message", messageSchema);
