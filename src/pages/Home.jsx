import React, { Component } from 'react';
import { IconButton } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import ProductItem from '../components/ProductItem';
import { getAmountFromStorage } from '../services/localStorage';

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

  render() {
    const { queryValue, categories, productsApi, apiRequest, amount } = this.state;
    return (
      <div>
        <header>
          {
            !queryValue && (
              <p data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
            )
          }
          <input
            type="text"
            name="queryValue"
            id=""
            data-testid="query-input"
            onChange={ this.handleChange }
            value={ queryValue }
          />
          <IconButton onClick={ this.handleClickButton } data-testid="query-button">
            <SearchIcon />
          </IconButton>
          <Link to="/cart">
            <IconButton data-testid="shopping-cart-button">
              <ShoppingCart />
              <span data-testid="shopping-cart-size">
                {
                  amount
                }
              </span>
            </IconButton>
          </Link>
        </header>
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
        <section>
          {!productsApi.length && apiRequest && <p>Nenhum produto foi encontrado</p>}
          {
            productsApi.map((product) => (
              <article
                data-testid="product"
                key={ product.id }
              >
                <ProductItem product={ product } />
              </article>
            ))
          }
        </section>
      </div>
    );
  }
}

export default Home;
