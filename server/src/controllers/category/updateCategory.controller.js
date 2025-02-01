const updateCategroyById = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      status_code: 500,
      message: "Internal Server Error",
      data: null,
      error: error.message,
    });
  }
};
