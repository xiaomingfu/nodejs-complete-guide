const fs = require("fs");

const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    //Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      //Analyze the cart => Fine existing product
      const existingProductIndex = cart.products.findIndex(
        product => product.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updateProduct;
      if (existingProduct) {
        updateProduct = { ...existingProduct };
        updateProduct.qty = updateProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updateProduct;
      } else {
        updateProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updateProduct];
      }
      cart.totalPrice = cart.totalPrice + parseFloat(productPrice);

      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileConent) => {
      if (err) {
        return;
      }
      const updateCart = { ...JSON.stringify.fileConent };
      const product = updateCart.products.find(prod => prod.id === id);
      const productQty = product.qty;
      updateCart.products = updateCart.products.filter(prod => prod.id !== id);
      updateCart.totalPrice = updateCart.totalPrice - productPrice * productQty;

      fs.writeFile(
        p,
        JSON.stringify(updateCart, err => {
          console.log(err);
        })
      );
    });
  }
};
