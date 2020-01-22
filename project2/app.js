const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const feedRoutes = require("./routes/feed");

const app = express();

// app.use(bodyParser.urlencoded()); //x-www-form-urlencoded

app.use(bodyParser.json()); //application/json

app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

mongoose
  .connect(
    "mongodb+srv://xiaoming:111@cluster0-fvtw9.mongodb.net/messages?retryWrites=true"
  )
  .then(result => {
    app.listen(8080, () => {
      console.log("start!");
    });
  })
  .catch(err => {
    console.log(err);
  });
