const express = require("express");
const app = express();

const path = require("path");
const route = express.Router();

const mainRoutes = require("./routes/main");
const adminRoutes = require("./routes/admin");
app.use(express.static(path.join(__dirname, "public")));
app.use(mainRoutes);
app.use(adminRoutes);

app.listen(3000, () => {
  console.log("server started");
});
