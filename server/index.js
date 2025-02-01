import app from "./app.js";
import connectionDatabase from "./src/config/database.js";
import router from "./src/routes/index.js";
import { notFoundResponse } from "./src/utils/responseHelper.js";
const PORT = process.env.PORT || 8080;
const database_url = process.env.MONGODB_URL;

connectionDatabase(database_url);

app.use(router);

app.use("/*", (req, res) => {
  return notFoundResponse(res, "Not Found", {
    code: 404,
    message: "Page not found",
    stack: null,
  });
});

app.use((error, req, res, next) => {
  return internalServerError(res, "Internal Server Error.", {
    code: 500,
    message: error.message,
    stack: error.stack,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
