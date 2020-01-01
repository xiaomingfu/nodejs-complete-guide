exports.getLogin = (req, res, next) => {
  return res.render("auth/login", {
    path: "/login",
    pageTitle: "login",
    isAuthenticated: req.isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
  req.isLoggedIn = true;
  redirect("/");
};
