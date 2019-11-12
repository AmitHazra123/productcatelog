/*eslint-disable*/
import React, { useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// core components
import Button from "../CustomButtons/Button.js";
import Float from "../FloatingButton/Float";

// styles
import styles from "../../assets/jss/user-kit/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

function HeaderLinks1(props) {
  // to back to the previous page
  const _handleBackButton = () => {
    window.history.back();
  };

  const classes = useStyles();
  const [direction, setDirection] = useState("");
  return (
    <List className={classes.list}>
      {
        (window.onscroll = () => {
          setDirection(window.oldScroll > window.scrollY ? "Up" : "Down");
          window.oldScroll = window.scrollY;
          if (window.scrollY == 0) setDirection("");
        })
      }
      {direction === "Down" ? (
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
          onClick={_handleBackButton}
        >
          BACK
        </Button>
      </ListItem>
    </List>
  );
}

export default HeaderLinks1;
