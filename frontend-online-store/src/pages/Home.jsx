import React from 'react';
import Header from '../components/Header';
import CardProduct from '../components/CardProduct';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      inputSearch: '',
      returnQuery: [],
      findReturnQuery: false,
      count: 0,
    };

    this.getProductQuery = this.getProductQuery.bind(this);
    this.getProductCategory = this.getProductCategory.bind(this);
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({
      categories,
    });
    this.countItens();
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  onClick = () => {
    this.getProductQuery();
  };

  async getProductQuery() {
    const { inputSearch } = this.state;
    const response = await getProductsFromCategoryAndQuery('', inputSearch);
    if (response.results.length > 0) {
      this.setState({
        returnQuery: response.results,
        findReturnQuery: false,
      });
    } else {
      this.setState({
        returnQuery: response.results,
        findReturnQuery: true,
      });
    }
  }

  onClickCategories = ({ target }) => {
    this.getProductCategory(target.value);
  };

  async getProductCategory(id) {
    const response = await getProductsFromCategoryAndQuery(id, '');
    this.setState({
      returnQuery: response.results,
    });
  }

  countItens = () => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      let sum = 0;
      JSON.parse(cart).forEach((item) => {
        const { quantity } = item;
        sum += quantity;
        this.setState({
          count: sum,
        });
      });
    }
  };

  render() {
    const { categories, inputSearch, returnQuery, findReturnQuery, count } = this.state;
    return (
      <div>
        <Header
          inputSearch={ inputSearch }
          handleChange={ this.handleChange }
          onClick={ this.onClick }
          count={ count }
        />
        <div>
          {
            categories.map((category) => {
              const { id, name } = category;
              return (
                <div key={ id }>
                  <button
                    data-testid="category"
                    type="button"
                    onClick={ this.onClickCategories }
                    value={ id }
                  >
                    { name }
                  </button>
                </div>
              );
            })
          }
        </div>
        <div>
          <p
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </div>
        <div>
          {
            findReturnQuery ? (<p>Nenhum produto foi encontrado</p>)
              : (
                returnQuery.map((product) => {
                  const {
                    id,
                    price,
                    thumbnail,
                    title,
                    available_quantity: availableQuantity,
                    shipping,
                  } = product;
                  return (
                    <div key={ `${id}${title}` }>
                      <CardProduct
                        id={ id }
                        price={ price }
                        thumbnail={ thumbnail }
                        title={ title }
                        countItens={ this.countItens }
                        availableQuantity={ availableQuantity }
                        shipping={ shipping.free_shipping }
                      />
                    </div>
                  );
                })
              )
          }
        </div>
      </div>
    );
  }
}

export default Home;
