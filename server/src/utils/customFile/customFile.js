import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

// Define __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const saveFile = async (file, folderName, customFilename = null) => {
  let uuid = crypto.randomUUID();
  try {
    const uploadsDir = path.resolve(__dirname, "../../../uploads/");

    const targetDir = path.join(uploadsDir, folderName);
    await fs.mkdir(targetDir, { recursive: true });

    let originalname = file.originalname;
    if (customFilename) {
      originalname = customFilename;
    }
    const safeFilename = path.basename(originalname).replace(/\s+/g, "-");
    const uniqueIdentifier = uuid; // Generate a unique identifier
    const filenameWithUniqueId = `${
      path.parse(safeFilename).name
    }-${uniqueIdentifier}${path.extname(safeFilename)}`;

    const filePath = path.join(targetDir, filenameWithUniqueId);
    await fs.writeFile(filePath, file.buffer);
    let filepathname = `uploads/${folderName}/${filenameWithUniqueId}`;

    return {
      originalname: file.originalname,
      modifiedName: filenameWithUniqueId,
      filepath: filepathname,
    };
  } catch (error) {
    console.error("Error saving file:", error.message);
    throw new Error("Could not save the file.");
  }
};

const deleteSaveFile = async (folderName, customFilename) => {
  try {
    // Define the base uploads directory
    const uploadsDir = path.resolve(__dirname, "uploads");

    // Build the full file path
    const safeFilename = path.basename(customFilename);
    const filePath = path.join(uploadsDir, folderName, safeFilename);

    // Delete the file
    await fs.unlink(filePath);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.warn("File not found, skipping delete:", error.message);
    } else {
      console.error("Error deleting file:", error.message);
      throw new Error("Could not delete the file.");
    }
  }
};

const fetchProductUrl = (req) => {
  const protocol = req.protocol; // e.g., 'http' or 'https'
  const host = req.get("host"); // e.g., 'example.com' or 'localhost:3000'
  const url = `${protocol}://${host}`; // Full URL

  return url;
};

export { saveFile, deleteSaveFile, fetchProductUrl };
