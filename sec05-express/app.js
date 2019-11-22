const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
  console.log("This is always run");
  next();
});
app.use("/add-product", (req, res, next) => {
  console.log("this is middleware");
  res.send("<h1>The 'Add Product' Page</h1>");
});

app.use("/", (req, res, next) => {
  console.log("this is another middleware");
  res.send("<h1>Hello from Express!</h1>");
});

// const server = http.createServer(app);

// server.listen(3000);

app.listen(3000);
