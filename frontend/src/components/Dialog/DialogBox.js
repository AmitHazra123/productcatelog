// require library modules
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

// proxy
import proxy from "../../proxy";

// require material ui components
import {
  Dialog,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Grid
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

// core components
import Button from "../CustomButtons/Button";
import Card from "../Card/ProfileCard";
import CardHeader from "../Card/CardHeader";
import CardBody from "../Card/CardBody";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import CustomInput from "../CustomInput/CustomInput";
import CardAvatar from "../Card/CardAvatar";

// react and redux connection
import { connect } from "react-redux";

// redux actions
import { closeDialog } from "../../actions/dialog";
import { addProduct } from "../../actions/product";

// styles
import styles from "../../assets/jss/user-kit/components/foodCartStyle";

// avatar
import avatar from "../../assets/img/faces/profile.jpg";

class DialogBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productName: "",
      description: "",
      rating: "",
      price: "",
      seller: "",
      manufacturer: "",
      discount: "",
      image: {},
      fileName: "",
      errors: {}
    };

    this._handleInsertProduct = this._handleInsertProduct.bind(this);
    this._handleCloseDialog = this._handleCloseDialog.bind(this);
    this._onChange = this._onChange.bind(this);
    this._handleOnChangeImage = this._handleOnChangeImage.bind(this);
  }

  _onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  _handleOnChangeImage = e => {
    this.setState({
      image: e.target.files[0],
      fileName: e.target.files[0].name
    });
    document.getElementById("image").src = URL.createObjectURL(
      e.target.files[0]
    );
  };

  _handleInsertProduct = () => {
    // create form data
    const fd = new FormData();

    if (this.state !== undefined) {
      fd.append("image", this.state.image);
      fd.append("name", this.state.productName);
      fd.append("description", this.state.description);
      fd.append("price", this.state.price);
      fd.append("seller", this.state.seller);
      fd.append("manufacturer", this.state.manufacturer);
      fd.append("rating", this.state.rating);
      fd.append("discount", this.state.discount);
      axios
        .post(`${proxy}/api/product/add-product`, fd, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${fd._boundary}`
          }
        })
        .then(res => {
          this.props.addProduct(res.data);
          this.props.closeDialog();
          this.props.closeDialog();
          this.props.closeDialog();
        })
        .catch(err => {
          this.setState({
            errors: err.response.data
          });
        });
    }
  };

  _handleCloseDialog = () => {
    this.props.closeDialog();
  };

  _Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  render() {
    const { classes } = this.props;

    return (
      <Dialog
        fullWidth={true}
        maxWidth={true}
        open={this.props.dialog.open}
        onClose={this._handleCloseDialog}
        TransitionComponent={this._Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={this._handleCloseDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Add Product
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container lg={12} md={12}>
          <Grid container item lg={12} md={12}></Grid>
          <br />
          <br />
          <br />
          <Grid container item lg={12} md={12} spacing={2}>
            <GridItem xs={12} sm={12} md={8}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Product</h4>
                  <p className={classes.cardCategoryWhite}>Add a new Product</p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Product Name"
                        id="product-name"
                        inputProps={{
                          name: "productName",
                          value:
                            this.state.productName !== undefined
                              ? this.state.productName
                              : "",
                          onChange: this._onChange
                        }}
                        formControlProps={{
                          fullWidth: true
                        }}
                        error={
                          this.state.errors.name === undefined ? false : true
                        }
                      />

                      <span style={{ color: "red" }}>
                        {this.state.errors.name === undefined
                          ? ""
                          : this.state.errors.name}
                      </span>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Product Description"
                        id="product-description"
                        inputProps={{
                          name: "description",
                          value:
                            this.state.description !== undefined
                              ? this.state.description
                              : "",
                          onChange: this._onChange
                        }}
                        formControlProps={{
                          fullWidth: true
                        }}
                        error={
                          this.state.errors.description === undefined
                            ? false
                            : true
                        }
                      />
                      <span style={{ color: "red" }}>
                        {this.state.errors.description === undefined
                          ? ""
                          : this.state.errors.description}
                      </span>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Rating"
                        id="rating"
                        inputProps={{
                          name: "rating",
                          type: "number",
                          value:
                            this.state.rating !== undefined
                              ? this.state.rating
                              : "",
                          onChange: this._onChange
                        }}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        id="price"
                        labelText="Price"
                        inputProps={{
                          name: "price",
                          type: "number",
                          value:
                            this.state.price !== undefined
                              ? this.state.price
                              : "",
                          onChange: this._onChange
                        }}
                        formControlProps={{
                          fullWidth: true
                        }}
                        error={
                          this.state.errors.price === undefined ? false : true
                        }
                      />
                      <span style={{ color: "red" }}>
                        {this.state.errors.price === undefined
                          ? ""
                          : this.state.errors.price}
                      </span>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card profile>
                <input
                  accept="image/*"
                  id="text-button-file"
                  multiple
                  type="file"
                  name="image"
                  onChange={this._handleOnChangeImage}
                  hidden
                />
                <label htmlFor="text-button-file">
                  <CardAvatar profile>
                    <img
                      id="image"
                      src={avatar}
                      alt="..."
                      height={400}
                      width={400}
                    />
                    <Button href="" component="span" color="white"></Button>
                  </CardAvatar>
                </label>
                <CardBody profile>
                  <h6 className={classes.cardCategory}>
                    Click on to the profile picture to upload image
                  </h6>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Manufacturer Name"
                        id="manufacturer-name"
                        inputProps={{
                          name: "manufacturer",
                          value:
                            this.state.manufacturer !== undefined
                              ? this.state.manufacturer
                              : "",
                          onChange: this._onChange
                        }}
                        formControlProps={{
                          fullWidth: true
                        }}
                        error={
                          this.state.errors.manufacturer === undefined
                            ? false
                            : true
                        }
                      />
                      <span style={{ color: "red" }}>
                        {this.state.errors.manufacturer === undefined
                          ? ""
                          : this.state.errors.manufacturer}
                      </span>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Seller Name"
                        id="seller-name"
                        inputProps={{
                          name: "seller",
                          value:
                            this.state.seller !== undefined
                              ? this.state.seller
                              : "",
                          onChange: this._onChange
                        }}
                        formControlProps={{
                          fullWidth: true
                        }}
                        error={
                          this.state.errors.seller === undefined ? false : true
                        }
                      />
                      <span style={{ color: "red" }}>
                        {this.state.errors.seller === undefined
                          ? ""
                          : this.state.errors.seller}
                      </span>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Discount"
                        id="discount"
                        inputProps={{
                          name: "discount",
                          type: "number",
                          value:
                            this.state.discount !== undefined
                              ? this.state.discount
                              : "",
                          onChange: this._onChange
                        }}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                      <span style={{ color: "red" }}>
                        {this.state.errors.discount === undefined
                          ? ""
                          : this.state.errors.discount}
                      </span>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
          <Grid container item lg={12} md={12} justify="center" spacing={2}>
            <Grid item lg={12} md={12}>
              <center>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this._handleInsertProduct}
                >
                  <Typography>Add Product</Typography>
                </Button>
              </center>
            </Grid>
          </Grid>
          <Grid container item lg={12} md={12}></Grid>
        </Grid>
      </Dialog>
    );
  }
}

DialogBox.propTypes = {
  classes: PropTypes.object.isRequired,
  dialog: PropTypes.object.isRequired,
  closeDialog: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  dialog: state.dialog
});

export default connect(
  mapStateToProps,
  { closeDialog, addProduct }
)(withStyles(styles)(withRouter(DialogBox)));
