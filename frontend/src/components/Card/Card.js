// required libraries
import React from "react";

// material ui components
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { CardActionArea, Paper } from "@material-ui/core";

// styles
import styles from "../../assets/jss/user-kit/components/cardStyle";

const useStyles = makeStyles(styles);

// open product details page
const _hankdleClickRest = (props, id) => {
  window.location.href = `/product-details/${id}`;
};

function ProductCard(props) {
  const classes = useStyles();
  const product = props.product;

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={() => _hankdleClickRest(props, product._id)}>
        <CardHeader title={product.name} />
        <CardMedia
          className={classes.media}
          image={product.image}
          title={product.name}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Paper style={{ boxShadow: "none", backgroundColor: "#F6F6F6" }}>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.rating} <i class="fas fa-star"></i>
          </Typography>
        </Paper>
        <Paper style={{ boxShadow: "none", backgroundColor: "#F6F6F6" }}>
          <Typography variant="body2" color="textSecondary" component="p">
            Rs. {product.price}
          </Typography>
        </Paper>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
