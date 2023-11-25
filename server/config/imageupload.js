import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "socioverse_avatar",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const Poststorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "socioverse_posts",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});
const Messagestorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "socioverse_messages",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

export const postupload = multer({ storage: Poststorage });

export const upload = multer({ storage: storage });

export const msgUpload = multer({ storage: Messagestorage });
