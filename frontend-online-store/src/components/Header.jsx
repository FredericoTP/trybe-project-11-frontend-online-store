import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <header>
        <div>
          <input
            type="text"
          />
          <button
            type="button"
          >
            Pesquisar
          </button>
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

export default Header;
