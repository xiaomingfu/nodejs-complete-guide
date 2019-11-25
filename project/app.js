const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");
// const expressHbs = require("express-handlebars");

const app = express();

// app.engine(
//   "hbs",
//   expressHbs({
//     layoutsDir: "views/layouts/",
//     defaultLayout: "main-layout",
//     extname: "hbs"
//   })
// );

// app.set("view engine", "hbs");
// app.set("view engine", "pug");
// app.set("views", "views");

app.set("view engine", "ejs");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));

// app.use("/", (req, res, next) => {
//   console.log("This is always run");
//   next();
// });

// const server = http.createServer(app);

// server.listen(3000);

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);
app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "page not found" });
});
app.listen(3000);
