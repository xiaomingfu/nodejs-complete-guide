const { validationResult } = require("express-validator/check");

const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    hasError: false,
    errorMessage: null,
    validationError: []
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.file;
  const price = req.body.price;
  const description = req.body.description;
  console.log(imageUrl);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("admin/edit-product", {
      path: "admin/edit",
      pageTitle: "Add Product",
      editing: false,
      hasError: true,
      errorMessage: errors.array()[0].msg,
      validationError: errors.array(),
      product: {
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description
      }
    });
  }
  //req.user also is sequelize object, has createProduct method which automatically create connected model
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user
  });
  product
    .save()
    .then(result => {
      console.log("Created Product");
      res.redirect("/admin/products");
    })
    .catch(err => {
      console.log("An error occurred!");
      // return res.status(500).render("admin/edit-product", {
      //   path: "/admin/edit-product",
      //   pageTitle: "Add Product",
      //   product: {
      //     title: title,
      //     price: price,
      //     description: description,
      //     imageUrl: imageUrl
      //   },
      //   editing: false,
      //   hasError: true,
      //   errorMessage: "Database opertaion failed, please try again.",
      //   validationError: []
      // });
      // res.redirect("/500");
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect("/");
      }
      return res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
        hasError: false,
        errorMessage: null,
        validationError: []
      });
    })
    .catch(err => {
      const error = new Error(err);
      err.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("/admin/edit-product", {
      path: "/admin/edit",
      pageTitle: "Edit Product",
      errorMessage: errors.array()[0].msg,
      hasError: true,
      editing: true,
      validationError: errors.array(),
      product: {
        title: updatedTitle,
        price: updatedPrice,
        imageUrl: updatedImageUrl,
        description: updatedDesc,
        _id: prodId
      }
    });
  }
  Product.findById(prodId)
    .then(product => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect("/");
      }
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.ImageUrl = updatedImageUrl;
      product.description = updatedDesc;
      return product.save().then(result => {
        console.log("Update data");
        res.redirect("/admin/products");
      });
    })

    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find({ userId: req.user._id })
    // .select("title price -_id")
    // .populate("userId", "name")
    .then(products => {
      console.log(products);
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products"
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatus.Code = 500;
      return next(error);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteOne({ _id: prodId }, { userId: req.user._id })
    .then(() => {
      console.log("Destroyed");
      res.redirect("/admin/products");
    })
    .catch(err => {
      const error = new Error(err);
      error.htttpStatus.Code = 500;
      return next(error);
    });
};
