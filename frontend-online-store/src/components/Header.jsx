import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../style/Header.css';
import cartImage from '../images/cart-shopping.png'

class Header extends React.Component {
  render() {
    const { inputSearch, handleChange, onClick, count } = this.props;
    return (
      <header className="header-component">
        <div className="header-title-container">
          <h1 className="header-title">Online Store</h1>
        </div>
        <div className="header-search-container">
          <div className="input-group mb-3">
            <input
              className="form-control"
              data-testid="query-input"
              name="inputSearch"
              type="text"
              value={ inputSearch }
              onChange={ handleChange }
            />
            <button
              className="btn btn-outline-secondary header-text"
              data-testid="query-button"
              type="button"
              onClick={ onClick }
            >
              Pesquisar
            </button>
          </div>
          <div>
            <p
              className="header-text"
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          </div>
        </div>
        <div className="header-cart-container">
          <Link
            className="cart-link-header"
            to="/shoppingcart"
            data-testid="shopping-cart-button"
          >
            <img src={ cartImage } alt="carrinho" />
            <p
              className="number-cart-itens"
              data-testid="shopping-cart-size"
            >
              { count }
            </p>
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
  count: PropTypes.number.isRequired,
};

export default Header;
