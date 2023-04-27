require("dotenv").config();
const config = {
  NODE_PRODUCTION: process.env.NODE_PRODUCTION || "development",
  MONGO_URL:
    process.env.MONGO_URL || "mongodb://localhost:27017/authentication",
  PORT: process.env.PORT || 8000,
  ACCESS_TOKEN:
    process.env.ACCESS_TOKEN || "b3dd3ca6867371c8447f0c0cc5a907bbba22caa5",
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY || "20m",
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY || 2,
  NODE_USER: process.env.NODEMAILER_USERNAME,
  NODE_PASS: process.env.NODEMAILER_PASSWORD,
  HOST: process.env.HOST,
  SERVICE: process.env.SERVICE,
  MAIL_PORT: process.env.MAIL_PORT,
};
module.exports = config;
