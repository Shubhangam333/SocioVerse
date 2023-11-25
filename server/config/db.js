import mongoose from "mongoose";

export const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URI).then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    });
  } catch (error) {
    throw new Error(error);
  }
};
