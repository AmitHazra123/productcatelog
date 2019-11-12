// require library modules
const express = require("express"); // for router configuration
const router = express.Router(); // creating router

// require rouing controllers
const {
  test,
  getProducts,
  getProductsNext,
  getProduct,
  addProduct,
  deleteProduct
} = require("../../controllers/product");

//@desc     test
//@route    GET /api/product/test
//@access   Public
router.get("/test", test);

//@desc     get all products
//@route    GET /api/product/get-products
//@access   Public
router.get("/get-products", getProducts);

//@desc     get all next products
//@route    GET /api/product/get-products/:id
//@access   Public
router.get("/get-products/:id", getProductsNext);

//@desc     get a single product
//@route    GET /api/product/get-product/:id
//@access   Public
router.get("/get-product/:id", getProduct);

//@desc     insert a  product
//@route    POST /api/product/add-product
//@access   Public
router.post("/add-product", addProduct);

//@desc     delete a product
//@route    DELETE /api/product/delete-Product
//@access   Public
router.delete("/delete-product/:id", deleteProduct);

module.exports = router;
