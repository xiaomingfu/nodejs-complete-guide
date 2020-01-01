exports.getLogin = (req, res, next) => {
  //   const isLoggedIn = req
  //     .get("cookie")
  //     .trim()
  //     .split("=")[1];
  console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "login",
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  //   res.setHeader("Set-Cookie", "loggedIn=true; HttpOnly");
  //   req.isLoggedIn = true;
  res.redirect("/");
};
