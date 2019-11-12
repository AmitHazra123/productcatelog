// database driver module
const mongoose = require("mongoose");

// require library modules
const cloudinary = require("cloudinary").v2;

// load database collection
const Product = require("../models/Product");

// load validation
const validateProductDetailsInput = require("../validations/product");

// TODO: test the product route
exports.test = async (req, res, next) => {
  res.json({
    success: true
  });
};

// TODO: get all products
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
      .limit(7)
      .sort({ date: -1 });
    if (products.length > 6) {
      products.pop();
      res.json({
        products,
        moreItem: true
      });
    } else {
      res.json({
        products,
        moreItem: false
      });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

// TODO:  get all products from the last id
exports.getProductsNext = async (req, res, next) => {
  const id = req.params.id;
  try {
    let ob = new mongoose.Types.ObjectId(id);
    const products = await Product.find({ _id: { $lt: ob } }).limit(7);

    if (products.length > 6) {
      products.pop();
      res.json({
        products,
        moreItem: true
      });
    } else {
      res.json({
        products,
        moreItem: false
      });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

// TODO: get a single product
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    console.log(err);
  }
};

// TODO: insert and update product
exports.addProduct = async (req, res, next) => {
  // if the data is valid
  try {
    const product = {};

    // initialize product with body information
    if (req.body.name) product.name = req.body.name;
    else
      return res
        .status(400)
        .json({ name: "At least name is required for update" });
    if (req.body.description) product.description = req.body.description;
    if (req.body.rating) product.rating = req.body.rating;
    if (req.body.price) product.price = req.body.price;
    if (req.body.seller) product.seller = req.body.seller;
    if (req.body.manufacturer) product.manufacturer = req.body.manufacturer;
    if (req.body.discount) product.discount = req.body.discount;

    // if there is a image file then upload it to cloudinary
    if (req.files !== null) {
      const file = req.files.image;
      await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
        if (err) throw err;
        product.image = result.url;
      });
    }

    // check for the product is already inserted or not
    const searchedProduct = await Product.findOne({ name: product.name });

    if (searchedProduct) {
      // if product is already inserted then update the product
      // update product
      const updatedProduct = await Product.findOneAndUpdate(
        { name: product.name },
        product,
        { new: true }
      );
      res.json(updatedProduct);
    } else {
      // check the data inserted by the user is valid or not
      const { errors, isValid } = validateProductDetailsInput(req.body);
      if (!isValid) res.status(400).json(errors);

      // if product is not already inserted then insert the product
      const newProduct = new Product(product);
      const insertedProduct = await newProduct.save();
      res.json(insertedProduct);
    }
  } catch (err) {
    console.log(err);
  }
};

// TODO: delete product
exports.deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete({
      _id: req.params.id
    });
    res.json(deletedProduct);
  } catch (err) {
    console.log(err);
  }
};
