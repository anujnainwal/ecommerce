import multer from "multer";

const bufferStorage = multer.memoryStorage();

const uploadFile = multer({
  storage: bufferStorage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

export { uploadFile };
