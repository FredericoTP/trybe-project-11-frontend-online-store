import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { inputSearch, handleChange, onClick } = this.props;
    return (
      <header>
        <div>
          <input
            data-testid="query-input"
            name="inputSearch"
            type="text"
            value={ inputSearch }
            onChange={ handleChange }
          />
          <button
            data-testid="query-button"
            type="button"
            onClick={ onClick }
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

Header.propTypes = {
  inputSearch: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Header;
