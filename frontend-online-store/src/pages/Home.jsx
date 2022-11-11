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
    };

    this.getProductQuery = this.getProductQuery.bind(this);
  }

  async componentDidMount() {
    const categories = await getCategories();

    this.setState({
      categories,
    });
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

  render() {
    const { categories, inputSearch, returnQuery, findReturnQuery } = this.state;
    return (
      <div>
        <Header
          inputSearch={ inputSearch }
          handleChange={ this.handleChange }
          onClick={ this.onClick }
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
                  const { id, price, thumbnail, title } = product;
                  return (
                    <div key={ `${id}${title}` }>
                      <CardProduct
                        id={ id }
                        price={ price }
                        thumbnail={ thumbnail }
                        title={ title }
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
