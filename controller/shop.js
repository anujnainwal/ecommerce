const Product = require("../models/product");
const Orders = require("../models/order");

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((product) => {
      res.render("shop/product-list", {
        prods: product,
        pageTitle: "Product",
        path: "/products",
        hasProducts: product.length > 0,
        activeShop: true,
        productCSS: true,
        isAuthenticated: req.user,
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};
exports.getShopIndex = (req, res, next) => {
  Product.find()
    .then((product) => {
      res.render("shop/index", {
        prods: product,
        pageTitle: "Shop",
        path: "/",
        hasProducts: product.length > 0,
        activeShop: true,
        productCSS: true,
        isAuthenticated: req.user,
        csrfToken: req.csrfToken(),
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};
exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")

    .then((user) => {
      const products = user.cart.items;
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
        isAuthenticated: req.user,
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));

  // Product.findById(prodId, (product) => {
  //   Cart.addProduct(prodId, product.price);
  // });
  // res.redirect("/cart");
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  req.user
    .removeCart(prodId)

    .then((products) => {
      console.log("products was deleted/");
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
  // Product.findById(prodId, (product) => {
  //   Cart.deleteProduct(prodId, product.price);
  //   res.redirect("/cart");
  // });
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return { product: { ...i.productId._doc }, quantity: i.quantity };
      });

      const order = new Orders({
        user: {
          email: req.user.email,
          userId: req.user,
        },
        products: products,
      });
      order.save();
    })
    .then(() => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => console.error(err));
};

exports.orders = (req, res, next) => {
  Orders.find()

    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
        isAuthenticated: req.user,
      });
    })
    .catch((err) => console.log(err));
  // req.user
  //   .getOrders({ include: ["products"] })
  //   .then((orders) => {
  //     res.render("shop/orders", {
  //       path: "/orders",
  //       pageTitle: "Your Orders",
  //       orders: orders,
  //     });
  //   })
  //   .catch((err) => console.log(err));
};

exports.getProductByID = (req, res, next) => {
  const productID = req.params.id;
  Product.findById(productID).then((product) => {
    res.render("shop/products-details", {
      pageTitle: "Product Details",
      path: "/products",
      product: product,
      activeShop: true,
      productCSS: true,
      isAuthenticated: req.user,
    });
  });
};
