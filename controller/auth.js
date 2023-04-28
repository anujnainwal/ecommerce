require("dotenv").config();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const nodeMailer = require("nodemailer");
const crypto = require("crypto");
const config = require("../config/config");
const { validationResult } = require("express-validator");

const transporter = nodeMailer.createTransport({
  host: config.HOST,
  service: config.SERVICE,
  port: config.MAIL_PORT,
  secure: true,
  auth: {
    user: config.NODE_USER,
    pass: config.NODE_PASS,
  },
});

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: message,
    oldInput: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationErrors: [],
  });
};
exports.postSignup = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  let confirmPassword = req.body.confirmPassword;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("auth/signup", {
      path: "/signup",
      pageTitle: "Signup",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
        confirmPassword: req.body.confirmPassword,
      },
      validationErrors: errors.array(),
    });
  }
  // User.findOne({ email: email })
  // .then((userDoc) => {
  // if (userDoc) {
  //   req.flash(
  //     "error",
  //     "This email has already been used. Please pick new one."
  //   );
  //   return res.redirect("/signup");
  // }
  bcrypt
    .hash(password, 12)
    .then((hashPassword) => {
      const user = new User({
        email: email,
        password: hashPassword,
        cart: { items: [] },
      });
      return user.save();
    })
    // })

    .then(() => {
      transporter.sendMail({
        to: email,
        from: "shopEE@noreply.com",
        subject: "Register successful",
        html: "<h1>Register successful</h1>",
      });
      res.redirect("/login");
    });
};
exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: message,
    oldInput: {
      email: "",
      password: "",
    },
    validationErrors: [],
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("auth/login", {
      path: "/login",
      pageTitle: "Login",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
      },
      validationErrors: errors.array(),
    });
  }

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid email and password");

        return res.status(422).render("auth/login", {
          path: "/login",
          pageTitle: "Login",
          errorMessage: "Invalid Crreedentails",
          oldInput: {
            email: email,
            password: password,
            confirmPassword: req.body.confirmPassword,
          },
          validationErrors: [],
        });
      }
      bcrypt.compare(password, user.password).then((matchPassword) => {
        if (matchPassword) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return res.redirect("/");
        }
        return res.status(422).render("auth/login", {
          path: "/login",
          pageTitle: "Login",
          errorMessage: "Invalid Crreedentails",
          oldInput: {
            email: email,
            password: password,
            confirmPassword: req.body.confirmPassword,
          },
          validationErrors: [],
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
};
exports.getReset = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "Reset Password",
    isAuthenticated: false,
    errorMessage: message,
  });
};
exports.postReset = (req, res, next) => {
  crypto.randomBytes(20, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          req.flash("error", "Email not found.");
          res.redirect("/reset");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 2 * 60 * 60 * 1000;
        return user.save();
      })
      .then((result) => {
        transporter.sendMail({
          to: req.body.email,
          from: "shopEE@noreply.com",
          subject: "Reset Password",
          html: `<h1>Click here <a href='http://localhost:3000/reset/${token}'>Reset Password</a></h1>`,
        });
        res.redirect("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
  })
    .then((user) => {
      let message = req.flash("error");
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }

      res.render("auth/new-password", {
        path: "/new-password",
        pageTitle: "New Password",
        isAuthenticated: false,
        errorMessage: message,
        userId: user._id.toString(),
        passwordToken: token,
      });
    })
    .catch((err) => console.log(err));
};

exports.postNewPassword = (req, res, next) => {
  let userPassword = req.body.password;
  let newUserId = req.body.userId;
  let passwordToken = req.body.passwordToken;
  let resetUser;
  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: newUserId,
  })
    .then((user) => {
      resetUser = user;
      return bcrypt.hash(userPassword, 12);
    })
    .then((hashPassword) => {
      resetUser.password = hashPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpire = undefined;
      return resetUser.save();
    })
    .then(() => {
      res.redirect("/login");
    });
};
