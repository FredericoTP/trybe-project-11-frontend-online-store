import React from 'react';
import { Link } from 'react-router-dom';

class HeaderDetails extends React.Component {
  render() {
    return (
      <header>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          Detalhes do Produto
        </div>
        <div>
          <Link
            to="/shoppingcart"
            data-testid="shopping-cart-button"
          >
            Carrinho
          </Link>
        </div>
      </header>
    );
  }
}

export default HeaderDetails;
