import multer from "multer";
import fs from "fs";
import path from "path";

const uploadFile = "./uploads";

try {
  fs.accessSync(uploadFile); 
} catch {
  fs.mkdirSync(uploadFile);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFile);
  },
    filename: function (req, file, cb) {
        const uniqueName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
         cb(new Error("Only .jpeg, .jpg, and .png files are allowed"), false);
    }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

export default upload;