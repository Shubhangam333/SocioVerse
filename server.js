import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import "express-async-errors";
import userRoutes from "./routes/user.js";
import morgan from "morgan";
import cloudinary from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";
import { upload } from "./config/imageupload.js";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const port = process.env.PORT || 5000;

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

app.use("/api/v1", upload.single("avatar"), userRoutes);

app.use(errorMiddleware);

app.listen(port, (req, res) => {
  console.log(`Server started on PORT: ${port}`);
});
