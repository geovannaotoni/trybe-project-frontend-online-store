import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ReplyIcon from '@mui/icons-material/Reply';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import {
  getAmountFromStorage,
  getProductsFromStorage,
  setProductsOnStorage } from '../services/localStorage';
import Evaluation from '../components/Evaluation';

class ProductDetail extends Component {
  state = {
    productInfo: '',
    freeShipping: false,
    cartAmount: 0,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const productInfo = await getProductById(id);
    this.setState({
      productInfo,
      freeShipping: productInfo.shipping.free_shipping,
      cartAmount: getAmountFromStorage(),
    });
  }

  addProductsToCart = (product) => {
    const oldList = getProductsFromStorage();
    const findProduct = oldList.find(({ id }) => product.id === id); // encontra o produto no carrinho, se ele já estiver salvo no localStorage
    if (findProduct) {
      if (findProduct.quantity < findProduct.available_quantity) {
        const newQuantity = findProduct.quantity + 1;
        const index = oldList.indexOf(findProduct);
        oldList.splice(index, 1); // retira o produto já existente
        setProductsOnStorage([...oldList, { ...product, quantity: newQuantity }]); // adiciona ele novamente com a nova quantidade
      }
    } else { // se nao estiver salvo no carrinho, cria uma nova lista e adiciona ele no final dela
      const newList = [...oldList, { ...product, quantity: 1 }]; // // recupera a lista antiga, acrescentando nela o novo produto
      setProductsOnStorage(newList);
    }
    // const { history: { push } } = this.props;
    // push('/cart');
    this.setState({
      cartAmount: getAmountFromStorage(),
    });
  };

  render() {
    const { history: { goBack } } = this.props;
    const { match: { params: { id } } } = this.props;
    const { productInfo, freeShipping, cartAmount } = this.state;
    return (
      <div>
        <header>
          <IconButton onClick={ () => goBack() }>
            <ReplyIcon />
          </IconButton>
          <Link to="/cart">
            <IconButton data-testid="shopping-cart-button">
              <ShoppingCart />
              <span data-testid="shopping-cart-size">
                {cartAmount}
              </span>
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
          <h4>
            { `Disponível em estoque: ${productInfo.available_quantity}`}
          </h4>
          <IconButton
            data-testid="product-detail-add-to-cart"
            onClick={ () => this.addProductsToCart(productInfo) }
          >
            <AddShoppingCartIcon />
          </IconButton>
          {freeShipping && <span data-testid="free-shipping">Frete Grátis</span>}
        </section>
        <section>
          <h2>Avaliações</h2>
          <Evaluation id={ id } />
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
