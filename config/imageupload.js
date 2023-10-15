import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "socioverse_avatar", // Optional: Specify a folder in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const Poststorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "socioverse_posts", // Optional: Specify a folder in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

export const postupload = multer({ storage: Poststorage });

export const upload = multer({ storage: storage });
