const successWithResponse = async (res, message = null, data = null) => {
  return res.status(200).json({
    status_code: 200,
    message: message || "Success",
    data: data,
    error: null,
  });
};

const createSuccessResponse = (res, message = null, data = null) => {
  return res.status(200).json({
    status_code: 201,
    message: message || "Created",
    data: data,
    error: null,
  });
};

const validationErrorResponse = async (res, message, error) => {
  return res.status(400).json({
    status_code: 400,
    message: message || "Validation error",
    data: null,
    error: error,
  });
};

const errorWithResponse = async (res, message = null, error = null) => {
  return res.status(400).json({
    status_code: 400,
    message: message || "Internal Server Error",
    data: null,
    error: error,
  });
};

const notFoundResponse = async (res, message, error) => {
  return res.status(404).json({
    status_code: 404,
    message: message || "Not found",
    data: null,
    error: error,
  });
};

const methodNotAllowedResponse = async (res, error) => {
  return res.status(405).json({
    status_code: 405,
    message: `Method Not Allowed`,
    data: null,
    error: null,
  });
};

const resourceAlreadyEixst = async (res, message, error) => {
  return res.status(409).json({
    status_code: 409,
    message: message || "Resource already exists",
    data: null,
    error: error,
  });
};

const unauthorizedResponse = async (res, message, error) => {
  return res.status(401).json({
    status_code: 401,
    message: message || "Unauthorized",
    data: null,
    error: error,
  });
};

const forbiddenResponse = async (res, message, error) => {
  return res.status(403).json({
    status_code: 403,
    message: message || "Forbidden",
    data: null,
    error: error,
  });
};

const internalServerError = async (res, message, error) => {
  return res.status(500).json({
    status_code: 500,
    message: message || "Internal server error",
    data: null,
    error: error,
  });
};

export {
  successWithResponse,
  createSuccessResponse,
  validationErrorResponse,
  errorWithResponse,
  notFoundResponse,
  methodNotAllowedResponse,
  resourceAlreadyEixst,
  unauthorizedResponse,
  forbiddenResponse,
  internalServerError,
};
