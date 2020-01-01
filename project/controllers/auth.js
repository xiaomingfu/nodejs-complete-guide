exports.getLogin = (req, res, next) => {
  const isLoggedIn = req
    .get("cookie")
    .trim()
    .split("=")[1];
  res.render("auth/login", {
    path: "/login",
    pageTitle: "login",
    isAuthenticated: isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
  res.setHeader("Set-Cookie", "loggedIn=true; HttpOnly");
  //   req.isLoggedIn = true;
  res.redirect("/");
};
