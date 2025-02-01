const whiteListed = [
  "http://localhost:5173",
  "http://localhost:8080/",
  "http://localhost:5001/",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteListed.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET, POST, PUT, PATCH ,DELETE",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

export default corsOptions;
