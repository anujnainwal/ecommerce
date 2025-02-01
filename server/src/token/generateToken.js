import jsonwebtoken from "jsonwebtoken";

const generateAccessToken = (data) => {
  return jsonwebtoken.sign(data, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    algorithm: "HS256",
  });
};

const generateRefreshToken = (data) => {
  return jsonwebtoken.sign(data, process.env.REFRESH_TOKEN_KEY, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
    algorithm: "HS256",
  });
};

export { generateAccessToken, generateRefreshToken };
