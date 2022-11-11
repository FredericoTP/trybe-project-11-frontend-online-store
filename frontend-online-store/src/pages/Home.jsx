import React from 'react';
import Header from '../components/Header';

class Home extends React.Component {
  render() {
    return (
      <div>
        <Header />
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
