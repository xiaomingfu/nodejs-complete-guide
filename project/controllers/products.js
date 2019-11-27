const products = [];

const getAddProduct = (req, res, next) => {
  res.render("add-product", {
    props: products,
    pageTitle: "Add Product",
    path: "/admin/add-product"
  });
};

const postAddProduct = (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
};
const getProducts = (req, res, next) => {
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true
  });
};

exports.getAddProduct = getAddProduct;
exports.postAddProduct = postAddProduct;
exports.getProducts = getProducts;
