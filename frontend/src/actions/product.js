// require library modules
import axios from "axios";

// proxy
import proxy from "../proxy";

import {
  ADD_PRODUCTS,
  ADD_PRODUCT,
  GET_PRODUCT,
  DELETE_PRODUCT
} from "./types";

// to add products to store from backend
export const addProducts = products => dispatch => {
  dispatch({
    type: ADD_PRODUCTS,
    payload: products
  });
};

// to add or update a single product to store
export const addProduct = product => dispatch => {
  dispatch({
    type: ADD_PRODUCT,
    payload: product
  });
};

// to get a single product
export const getProduct = id => dispatch => {
  axios
    .get(`${proxy}/api/product/get-product/${id}`)
    .then(res => {
      dispatch({
        type: GET_PRODUCT,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// to delete a single product
export const deleteProduct = id => dispatch => {
  axios
    .delete(`${proxy}/api/product/delete-product/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_PRODUCT,
        payload: {}
      });
    })
    .catch(err => console.log(err));
};
