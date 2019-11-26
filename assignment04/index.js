const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const path = require("path");

app.set("view engine", "ejs");
app.set("views", "views");

const mainData = require("./routes/main");
const adminRoutes = require("./routes/admin");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(mainData.routes);
app.use(adminRoutes);

app.listen(3000, () => {
  console.log("server started");
});
