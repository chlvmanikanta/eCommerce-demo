import React, {useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';

import { connect } from "react-redux";

import Header from '../components/Header';
import { addProduct } from "../store/actions/products";

import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'left'
  },
  media: {
    height: 420,
    width: 480,
  },
  productItem: {
    width: '100%',
    display: 'flex'
  }
});
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function Details(props) {
  const classes = useStyles();
  let history = useHistory();
  let [alertConfig, setAlertCofig] = useState({show: false, duration: 2000});
  let { id } = useParams();
  let selectedProduct = props.products.filter(item => item.id == id)[0];

  const addToCart = ()=>{
    props.addProduct(selectedProduct);
    setAlertCofig({...alertConfig, show: true, msg: "Item successfully added to Cart"});
  }
  const buyNow = ()=>{
    history.push('/payment');
  }

  const handleClose = ()=>{
    setAlertCofig({...alertConfig, show: false, msg: ""});
    history.push('/'); // Added here in place of timeout in order to auto redirect once message disappears
  }

  return (
    <div className="App">
      <Header title="Product Details" />
      <Container className={classes.container}>
        <Card className={classes.productItem}>
          <div>
            <CardMedia
              className={classes.media}
              image="/assets/images/shirt.png"
              title="Product"
            />
          </div>
          <div>
            <CardContent>
              <CardActionArea>
                <Typography variant="h5" color="primary" component="h4">{selectedProduct.name}</Typography>
              </CardActionArea>
              <Typography variant="h6" component="h6">&#8377; {selectedProduct.price}</Typography>
              <Typography variant="body2" color="textSecondary" component="p">{selectedProduct.description}</Typography>
              <Typography variant="body2" color="textSecondary" component="p">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" onClick={addToCart} color="primary">Add to Cart</Button>
              <Button size="small" variant="contained" onClick={buyNow} color="secondary">Buy Now</Button>
            </CardActions>
          </div>
        </Card>
      </Container>
      <Snackbar open={alertConfig.show} autoHideDuration={alertConfig.duration} onClose={handleClose}>
        <Alert severity="success" onClose={handleClose}>{alertConfig.msg}</Alert>
      </Snackbar>
    </div>
  );
}

// export default Details;
export default connect(state => {
    return {products: state.products.products}
  }, { addProduct }
)(Details);