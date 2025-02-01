import express from "express";
import cors from "cors";
import corsOptions from "./src/config/config.js";
import helmet from "helmet";
import logger from "morgan";
import {
  internalServerError,
  successWithResponse,
} from "./src/utils/responseHelper.js";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors(corsOptions));
// app.use(helmet());
app.use(logger("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/", (req, res) => {
  try {
    return successWithResponse(res, "Ecommerce Server is Online Now.");
  } catch (error) {
    return internalServerError(res, "Internal Server Error.", {
      error: {
        code: 500,
        message: error.message,
        stack: error.stack,
      },
    });
  }
});

export default app;
