// required library modules
import { combineReducers } from "redux";

// required reducers
import dialog from "./dialog";
import products from "./product";

export default combineReducers({
  dialog,
  products
});
