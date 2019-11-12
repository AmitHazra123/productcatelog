// required library modules
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// redux connection
import { connect } from "react-redux";

// actions
import { getProduct, deleteProduct } from "../actions/product";

// material ui components
import { Typography } from "@material-ui/core";

// core components
import Header from "../components/Header/Header";
import Table from "../components/Table/Table";
import Button from "../components/CustomButtons/Button";
import HeaderLinks1 from "../components/Header/HeaderLinks1";

function ProductDetails(props) {
  const [product, setProduct] = useState();

  useEffect(() => {
    props.getProduct(props.match.params.id);
  }, []);

  useEffect(() => {
    setProduct(props.products.product);
  }, [props.products]);

  const { ...rest } = props;

  // initialize seller variable
  let seller = "";
  if (product !== undefined) {
    seller = product.hasOwnProperty("seller") ? product.seller : "";
  }

  // initialize discount variable
  let discount = "";
  if (product !== undefined) {
    discount = product.hasOwnProperty("discount") ? product.discount : "";
  }

  // to delete a single product
  const deleteProduct = () => {
    if (product !== undefined) {
      props.deleteProduct(product._id);
      window.location.href = "/";
    }
  };

  return (
    <div>
      <Header
        brand={product !== undefined ? product.name : ""}
        rightLinks={<HeaderLinks1 from="component" />}
        fixed
        {...rest}
      />

      <br />
      <br />
      <br />
      <div>
        <center>
          <img
            src={product !== undefined ? product.image : ""}
            width={1150}
            height={500}
            style={{ marginLeft: "auto" }}
            // alt={product !== null ? product.name : ""}
          />
        </center>
      </div>
      <div width={1150} style={{ marginLeft: 105, marginRight: 105 }}>
        <h2>Description</h2>
        <Typography variant="body1">
          {product !== undefined ? product.description : ""}
        </Typography>
        <Table
          tableData={[
            ["Seller Name", seller],
            [
              "Manufacturer Name",
              product !== undefined ? product.manufacturer : ""
            ],
            ["Discount", discount]
          ]}
        />
        <br />
        <center>
          <Button color="primary" onClick={deleteProduct}>
            <Typography variant="subtitle1">Delete Product</Typography>
          </Button>
        </center>
      </div>
    </div>
  );
}

ProductDetails.propTypes = {
  products: PropTypes.object.isRequired,
  getProduct: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: state.products
});

export default connect(
  mapStateToProps,
  { getProduct, deleteProduct }
)(ProductDetails);
