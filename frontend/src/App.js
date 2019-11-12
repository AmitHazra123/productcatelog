// required library modules for react
import React from "react"; // base library module
import { Router, Route } from "react-router-dom"; // for routing pages
import { createBrowserHistory } from "history"; // to create history in router

// styles
import "../src/assets/scss/material-kit-react.scss?v=1.8.0";
import "../src/assets/css/material-dashboard-react.css";

// required pages
import ProductCatelog from "./views/ProductCatelog";
import ProductDetails from "./views/ProductDetails";

// react and redux connection module
import { Provider } from "react-redux";

// redux store
import store from "./store";

// router navigation management module
const hist = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router history={hist}>
          <Route exact path="/" component={ProductCatelog} />
          <Route exact path="/product-details/:id" component={ProductDetails} />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
