const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();
const User = require("./models/user.model");
const pageNotFoundError = require("./controller/error");
app.set("view engine", "ejs");
app.set("views", "views");
const mongoose = require("mongoose");
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const csrf = require("csurf");
const session = require("express-session");
const flash = require("connect-flash");
const MongoDBStore = require("connect-mongodb-session")(session);
const MONGOURL = "mongodb://127.0.0.1:27017/node_ecommerce";
const store = new MongoDBStore({
  uri: MONGOURL,
  collection: "mySessions",
});
const csrfProtection = csrf();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(csrfProtection);
app.use(flash());
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.error(err);
      next();
    });
});

app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});
app.use("/admin", adminData);
app.use(authRoutes);
app.use(shopRoutes);

pageNotFoundError.page404Error;
mongoose
  .connect(MONGOURL)
  .then((result) => {
    console.log("Connected");
    User.findOne().then((user) => {});
    app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
  })
  .catch((err) => {
    console.error(err);
  });
