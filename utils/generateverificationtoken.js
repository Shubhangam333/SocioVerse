import crypto from "crypto";

export const generateVerificationToken = () => {
  return crypto.randomBytes(20).toString("hex");
};
