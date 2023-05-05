import React, { Component } from 'react';
import { IconButton } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import ProductItem from '../components/ProductItem';
import { getAmountFromStorage } from '../services/localStorage';
import '../styles/Home.css';

class Home extends Component {
  state = {
    categories: [], // salva o array de categorias retornado pela API no state
    queryValue: '',
    productsApi: [], // salva o retorno da api
    apiRequest: false,
    amount: 0,
  };

  async componentDidMount() {
    const categoriesFromAPI = await getCategories();
    this.setState({
      categories: categoriesFromAPI,
      amount: getAmountFromStorage(),
    });
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClickButton = async () => {
    const { queryValue } = this.state;
    const products = await getProductsFromCategoryAndQuery('', queryValue);
    this.setState({
      productsApi: products.results,
      apiRequest: true,
      queryValue: '',
    });
  };

  handleClickCategory = async (event) => {
    const categoryId = event.target.value;
    const products = await getProductsFromCategoryAndQuery(categoryId, '');
    this.setState({
      productsApi: products.results,
      apiRequest: true,
      queryValue: '',
    });
  };

  updateAmount = (newAmount) => {
    this.setState({
      amount: newAmount,
    });
  };

  render() {
    const { queryValue, categories, productsApi, apiRequest, amount } = this.state;
    return (
      <>
        <header>
          <div className="name">
            <ShoppingBasketIcon style={ { color: '#2FC18C', fontSize: '4rem' } } />
            <div>
              <span>FRONT-END</span>
              <span>online store</span>
            </div>
          </div>
          <form>
            <div data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </div>
            <input
              type="text"
              name="queryValue"
              id=""
              data-testid="query-input"
              onChange={ this.handleChange }
              value={ queryValue }
            />
            <IconButton onClick={ this.handleClickButton } data-testid="query-button">
              <SearchIcon
                style={
                  { color: 'white', backgroundColor: '#2FC18C', borderRadius: '2rem', height: '2rem', width: '2rem', padding: '0.2rem' }
                }
              />
            </IconButton>
          </form>
          <Link to="/cart">
            <IconButton
              style={ { color: 'white' } }
              data-testid="shopping-cart-button"
            >
              <ShoppingCart style={ { fontSize: '3rem' } } />
              <span data-testid="shopping-cart-size" className="size">
                {amount}
              </span>
            </IconButton>
          </Link>
        </header>
        <main>
          <nav>
            <p>Categorias</p>
            <ul>
              {
                categories.map((category) => (
                  <li key={ category.id }>
                    <label
                      htmlFor={ category.id }
                      data-testid="category"
                    >
                      <input
                        type="radio"
                        name="categoryId"
                        id={ category.id }
                        value={ category.id }
                        onChange={ (event) => this.handleClickCategory(event) }
                      />
                      { category.name }
                    </label>
                  </li>
                ))
              }
            </ul>
          </nav>
          <div className="products">
            {!productsApi.length && apiRequest && <p>Nenhum produto foi encontrado</p>}
            {
              productsApi.map((product) => (
                <section
                  data-testid="product"
                  key={ product.id }
                >
                  <ProductItem product={ product } updateAmount={ this.updateAmount } />
                </section>
              ))
            }
          </div>
        </main>
      </>
    );
  }
}

export default Home;
