import { CourierClient } from "@trycourier/courier";
import dotenv from "dotenv";

dotenv.config();

const courier = CourierClient({
  authorizationToken: process.env.AUTHORIZATION_TOKEN,
});

export const sendVerificationEmail = async (user) => {
  const link = `http://127.0.0.1:5000/api/v1/register/verify/${user.verificationToken}`;
  const { requestId } = await courier.send({
    message: {
      content: {
        title: "Welcome to SocioVerse",
        body: "Click the link to verify your email: {{verificationLink}}",
      },
      data: {
        verificationLink: link,
      },
      to: {
        email: user.email,
      },
    },
  });
  return requestId;
};
