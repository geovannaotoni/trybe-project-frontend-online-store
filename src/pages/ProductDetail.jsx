import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ReplyIcon from '@mui/icons-material/Reply';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { getProductsFromStorage, setProductsOnStorage } from '../services/localStorage';

class ProductDetail extends Component {
  state = {
    productInfo: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const productInfo = await getProductById(id);
    this.setState({
      productInfo,
    });
  }

  addProductsToCart = (product) => {
    const oldList = getProductsFromStorage();
    const newList = [...oldList, { ...product, quantity: 1 }]; // recupera a lista antiga, acrescentando nela o novo produto
    setProductsOnStorage(newList);
    // const { history: { push } } = this.props;
    // push('/cart');
  };

  render() {
    const { history: { goBack } } = this.props;
    const { productInfo } = this.state;
    return (
      <div>
        <header>
          <IconButton onClick={ () => goBack() }>
            <ReplyIcon />
          </IconButton>
          <Link to="/cart">
            <IconButton data-testid="shopping-cart-button">
              <ShoppingCart />
            </IconButton>
          </Link>
        </header>
        <section>
          <h2 data-testid="product-detail-name">{ productInfo.title }</h2>
          <img
            data-testid="product-detail-image"
            src={ productInfo.thumbnail }
            alt={ productInfo.name }
          />
          <h3 data-testid="product-detail-price">{ productInfo.price }</h3>
          <h4>{ productInfo.warranty }</h4>
          <IconButton
            data-testid="product-detail-add-to-cart"
            onClick={ () => this.addProductsToCart(productInfo) }
          >
            <AddShoppingCartIcon />
          </IconButton>
        </section>
      </div>
    );
  }
}

ProductDetail.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default ProductDetail;
