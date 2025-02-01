import jwt from "jsonwebtoken";
import {
  forbiddenResponse,
  internalServerError,
  unauthorizedResponse,
} from "../utils/responseHelper.js";
const SECRET_KEY = process.env.ACCESS_TOKEN_KEY;

function Secure_Auth(req, res, next) {
  const authorization = req.headers.authorization || req.headers.Authorization;
  if (!authorization) {
    return unauthorizedResponse(
      res,
      "Authorization Required",
      "Authorization header is missing. Please include a valid authorization header in your request."
    );
  }
  try {
    const token = authorization.split("Bearer ")[1];
    if (!token) {
      return unauthorizedResponse(
        res,
        "Authorization Required",
        "Invalid Token Format."
      );
    }
    const decode = jwt.verify(token, SECRET_KEY);
    req.user = decode;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return unauthorizedResponse(
        res,
        "Your session has expired. Please log in again to continue.",
        error.message
      );
    }
    if (error instanceof jwt.JsonWebTokenError || error instanceof TokenError) {
      return unauthorizedResponse(
        res,
        "Invalid token. Please provide a valid authentication token.",
        error.message
      );
    }
    return internalServerError(res, "Internal Server Error.", error.message);
  }
}

const checkPermission = (allowedRoles = []) => {
  return (req, res, next) => {
    try {
      // Ensure the user object exists in the request
      if (!req.user || !req.user.role) {
        return res.status(401).json({
          status: "error",
          message: "Unauthorized",
          details: "User information is missing or invalid.",
        });
      }

      const userRole = req.user.role;

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          status: "error",
          message: "Forbidden",
          details: "You don't have permission to access this resource.",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
        details: error.message,
      });
    }
  };
};

export { Secure_Auth, checkPermission };
