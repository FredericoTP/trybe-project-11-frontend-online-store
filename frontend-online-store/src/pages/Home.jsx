import React from 'react';
import Header from '../components/Header';
import { getCategories } from '../services/api';

class Home extends React.Component {
  state = {
    categories: [],
  };

  async componentDidMount() {
    const categories = await getCategories();

    this.setState({
      categories,
    });
  }

  render() {
    const { categories } = this.state;
    return (
      <div>
        <Header />
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
      </div>
    );
  }
}

export default Home;
