const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-products", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageURl = req.body.imageURL;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title: title,
    price: price,
    imageURL: imageURl,
    description: description,
    userId: req.user,
  });
  //or
  product
    .save()
    .then(() => {
      console.log("product create successfull.");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-products", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productID;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageURL;
  const updatedDesc = req.body.description;

  Product.findById(prodId)
    .then((product) => {
      if (product.userId !== req.user._id) {
        res.redirect("/");
      }
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageURL = updatedImageUrl;
      product.description = updatedDesc;

      return product.save().then(() => {
        console.log("Product updated");
      });
    })

    .catch((err) => {
      console.log(err);
    });
  res.redirect("/admin/products");
};

exports.getProducts = (req, res, next) => {
  Product.find({ userId: req.user._id })

    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  Product.deleteOne({ _id: prodId, userId: req.user._id })
    .then(() => {
      console.log("Product deleted");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/admin/products");
};
