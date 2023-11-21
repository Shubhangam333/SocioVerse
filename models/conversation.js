import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    recipients: [{ type: mongoose.Types.ObjectId, ref: "user" }],
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

export const conversation = mongoose.model("conversation", conversationSchema);
