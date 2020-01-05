const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");

const User = require("../models/user");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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"
    }
  })
);

exports.getLogin = (req, res, next) => {
  //   const isLoggedIn = req
  //     .get("cookie")
  //     .trim()
  //     .split("=")[1];
  console.log(req.user);
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "login",
    errorMessage: message
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash("error", "Invalid email or password.");
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect("/");
            });
          }
          req.flash("error", "Invalid email or password.");
          res.redirect("/login");
        })
        .catch(err => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch(err => console.log(err));
  //   res.setHeader("Set-Cookie", "loggedIn=true; HttpOnly");
  //   req.isLoggedIn = true;
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "signup",
    isAuthenticated: false,
    errorMessage: message
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const comfirmedPassword = req.body.comfirmedPassword;
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        req.flash(
          "error",
          "The email already exists, please pick a different one."
        );
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] }
          });
          return user.save();
        })
        .then(result => {
          res.redirect("/login");
          transporter.sendMail({
            to: email,
            from: "shop@node-complete.com",
            subject: "Signup succeeded!",
            html: "<h1>You successfully signed up!</h1>"
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
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
    errorMessage: message
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/reset");
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          res.flash("error", "The email does not exist!");
          return res.redirect("/reset");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then(result => {
        transporter.sendMail({
          to: req.body.email,
          from: "shop@node-complete.com",
          subject: "Reset Password",
          html: `<p1>You requested to reset password.</p1>
          <p>You can click this <a href="http://localhost:3000/reset/${token}">link</a> to reset your password.</p>`
        });
      })
      .catch(err => console.log(err));
  });
};
