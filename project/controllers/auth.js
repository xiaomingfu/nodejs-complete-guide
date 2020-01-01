const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  //   const isLoggedIn = req
  //     .get("cookie")
  //     .trim()
  //     .split("=")[1];
  console.log(req.session.user);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "login",
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("5e085016273af66c1f9b7ff1")
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect("/");
    })
    .catch(err => console.log(err));
  //   res.setHeader("Set-Cookie", "loggedIn=true; HttpOnly");
  //   req.isLoggedIn = true;
};
