// require library modules
const mongoose = require("mongoose"); // required to create schema and model

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
    maxlength: [20, "name cannot be more than 20 characters"]
  },
  image: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number
  },
  price: {
    type: Number,
    required: true
  },
  seller: {
    type: String,
    maxlength: [50, "seller name cannot be more than 20 characters"]
  },
  manufacturer: {
    type: String,
    maxlength: [50, "manufacturer name cannot be more than 20 characters"],
    required: true
  },
  discount: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Product", ProductSchema);
