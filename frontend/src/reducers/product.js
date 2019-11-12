import {
  ADD_PRODUCTS,
  DELETE_PRODUCT,
  ADD_PRODUCT,
  GET_PRODUCT
} from "../actions/types";

const initialState = {
  products: [],
  product: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    // case to add products to store from database
    case ADD_PRODUCTS:
      return {
        ...state,
        products: state.products.concat(action.payload)
      };
    // case to add or update a product
    case ADD_PRODUCT:
      return {
        ...state,
        products: [action.payload].concat(
          state.products.filter(product => product._id !== action.payload._id)
        )
      };
    // case to get a single product
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload
      };
    // case to delete a single product
    case DELETE_PRODUCT:
      return {
        ...state,
        product: action.payload
      };
    default:
      return state;
  }
}
