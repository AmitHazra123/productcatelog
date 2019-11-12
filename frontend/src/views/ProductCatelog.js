import React, { useEffect, useState } from "react";
import axios from "axios";

// proxy
import proxy from "../proxy";

// material ui components
import { Grid, Typography } from "@material-ui/core";

// redux connection
import { connect } from "react-redux";
import PropTypes from "prop-types";

// actions
import { addProducts } from "../actions/product";

// required components
import Header from "../components/Header/Header";
import HeaderLinks from "../components/Header/HeaderLinks";
import Card from "../components/Card/Card";
import Button from "../components/CustomButtons/Button";
import Dialog from "../components/Dialog/DialogBox";

function ProductCatelog(props) {
  const [products, setProducts] = useState([]);
  const [moreItem, setMoreItem] = useState(false);

  useEffect(() => {
    axios
      .get(`${proxy}/api/product/get-products`)
      .then(res => {
        // call redux action
        props.addProducts(res.data.products);
        // has more item in database
        setMoreItem(res.data.moreItem);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    setProducts(props.products.products);
  }, [props.products]);

  const { ...rest } = props;

  let cols = [[]];
  let rows = [];
  let count = 0;

  if (products !== undefined) {
    // columns of cards
    for (let i = 0; i < Math.ceil(products.length / 3); i++) {
      for (let j = 0; j < 3; j++) {
        if (count >= products.length) break;
        else {
          cols[0].push(
            <Grid item lg={4}>
              <center>
                <Card product={products[count]} />
              </center>
            </Grid>
          );
          count++;
        }
      }
    }

    // rows of cards
    for (let i = 0; i < Math.ceil(products.length / 3); i++) {
      rows.push(
        <Grid container direction="row" lg={12} spacing={4}>
          {cols[i]}
        </Grid>
      );
    }
  }

  // to view more products
  const _handleViewMore = () => {
    const lastProduct = products[products.length - 1];
    axios
      .get(`${proxy}/api/product/get-products/${lastProduct._id}`)
      .then(res => {
        // call redux action to update the array
        props.addProducts(res.data.products);
        // has more item
        setMoreItem(res.data.moreItem);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <Header
        brand="Product Catelog"
        rightLinks={<HeaderLinks from="component" />}
        fixed
        {...rest}
      />
      <Dialog />
      <br />
      <br />
      <br />
      <br />
      {rows[0]}
      <br />
      <center>
        {moreItem !== false ? (
          <Button color="primary" onClick={_handleViewMore}>
            <Typography variant="subtitle1">View More</Typography>
          </Button>
        ) : null}
      </center>
    </div>
  );
}

ProductCatelog.propTypes = {
  addProducts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: state.products
});

export default connect(
  mapStateToProps,
  { addProducts }
)(ProductCatelog);
