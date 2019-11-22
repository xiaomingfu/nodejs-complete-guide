const express = require("express");

const app = express();

// app.use((req, res, next) => {
//   console.log("This is one middleware");
//   next();
// });
// app.use((req, res, next) => {
//   console.log("This is another middleware");
// });

app.use("/users", (req, res, next) => {
  console.log("This is user middleware");
  res.send("<p>This middleware just handle /users</p>");
});

app.use("/", (req, res, next) => {
  console.log("This is / middleware");
  res.send("<h1>Welcome to my page</h1>");
});
app.listen(3000);
