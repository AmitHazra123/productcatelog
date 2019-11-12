// require library module for validation
const validator = require("validator");

// require is-empty helper module to check any data empty or not
const isEmpty = require("./is-empty");

module.exports = function validateProductDetailsInput(data) {
  let errors = {};

  // asign each empty object or any type of data members as string
  data.name = !isEmpty(data.name) ? data.name : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.price = !isEmpty(data.price) ? data.price : "";
  data.manufacturer = !isEmpty(data.manufacturer) ? data.manufacturer : "";

  // check for name is empty or not
  if (validator.isEmpty(data.name)) {
    errors.name = "Product Name is required";
  }

  // check for description is empty or not
  if (validator.isEmpty(data.description)) {
    errors.description = "Product Description is required";
  }

  // check for price is empty or not
  if (validator.isEmpty(data.price)) {
    errors.price = "Product Price is required";
  }

  // check for manufacturer is empty or not
  if (validator.isEmpty(data.manufacturer)) {
    errors.manufacturer = "Manufacturer Name is required";
  }

  // check for product name is greater than 20 or not
  if (!validator.isEmpty(data.name)) {
    if (data.name.trim().length > 20)
      errors.name = "Product Name must be within 20 characters";
  }

  // check for manufacturer name is greater than 20 or not
  if (!validator.isEmpty(data.manufacturer)) {
    if (data.manufacturer.trim().length > 50)
      errors.manufacturer = "Manufactuer Name must be within 50 characters";
  }

  // check for seller name is greater than 20 or not
  if (!validator.isEmpty(data.seller)) {
    if (data.seller.trim().length > 50)
      errors.seller = "Seller Name must be within 50 characters";
  }

  // return errors and product details information is valid or not
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
