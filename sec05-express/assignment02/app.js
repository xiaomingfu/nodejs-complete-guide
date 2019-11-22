const express = require("express");

const app = express();

app.use("/users", (req, res, next) => {
  console.log("This is user page");
});

app.use("/", (req, res, next) => {
  console.log("This is home page");
  res.send("<h1>Welcome to my page</h1>");
});
app.listen(3000);
