import Header from '../components/Header';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'left'
  },
  media: {
    height: 300,
  },
  btnContainer:{
    display: 'flex',
    justifyContent: 'space-between'
  },
  productItem: {
    margin: '10px 5px',
    maxWidth: 'calc(25% - 10px)',
  }
});
function Home({products}) {
  const classes = useStyles();
  return (
    <div className="App">
      <Header title="Home" type="home" />
      <Container className={[classes.container, "product-flex-container"]}>
        {
          products.map(item => 
            (<Card key={item.id} className={classes.productItem}>
              <CardActionArea>
                <Link to={"details/"+ item.id}><CardMedia
                  className={classes.media}
                  image="/assets/images/shirt.png"
                  title="Product"
                /></Link>
              </CardActionArea>
              <CardContent>
                <CardActionArea>
                  <Link to={"details/"+ item.id}><Typography variant="h5" color="primary" component="h4">{item.name}</Typography></Link>
                </CardActionArea>
                <Typography variant="h6" component="h6">&#8377; {item.price}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">{item.description}</Typography>
              </CardContent>
              {/* <CardActions className={classes.btnContainer}>
                <Button size="small" variant="contained" color="primary">Add to Cart</Button>
                <Button size="small" variant="contained" color="secondary">Buy Now</Button>
              </CardActions> */}
            </Card>)
          )
        }

      </Container>
    </div>
  );
}

// export default Home;
export default connect(state => {
  return {products: state.products.products}
})(Home);