/*eslint-disable*/
import React, { useState } from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// core components
import Button from "../CustomButtons/Button.js";
import Float from "../FloatingButton/Float";

// react and redux connection
import { connect } from "react-redux";

// import action for redux
import { openDialog } from "../../actions/dialog";

// styles
import styles from "../../assets/jss/user-kit/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

function HeaderLinks(props) {
  const classes = useStyles();
  const [direction, setDirection] = useState("");

  // to add new product
  const _addProduct = () => {
    // open dialog window
    props.openDialog();
  };

  return (
    <List className={classes.list}>
      {
        // check direction of scrolling like up or down
        (window.onscroll = () => {
          setDirection(window.oldScroll > window.scrollY ? "Up" : "Down");
          window.oldScroll = window.scrollY;
          if (window.scrollY == 0) setDirection("");
        })
      }
      {// floating button
      direction === "Down" ? (
        <Float direction="down" />
      ) : direction === "Up" ? (
        <Float direction="up" />
      ) : (
        ""
      )}
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          className={classes.navLink}
          onClick={_addProduct}
        >
          ADD PRODUCT
        </Button>
      </ListItem>
    </List>
  );
}

HeaderLinks.propTypes = {
  openDialog: PropTypes.func.isRequired
};

export default connect(
  null,
  { openDialog }
)(HeaderLinks);
