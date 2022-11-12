import React from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import HeaderDetails from '../components/HeaderDetails';

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      productResult: [],
      picture: '',
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const response = await getProductById(id);
    this.setState({
      productResult: response,
      picture: response.pictures[0].url,
    });
  }

  onClick = () => {
    const { productResult } = this.state;
    const { id, price, thumbnail, title } = productResult;
    const cart = { id, price, thumbnail, title, quantity: 1 };
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([cart]));
    } else {
      const cartItens = JSON.parse(localStorage.getItem('cart'));
      if (!(cartItens.some((item) => item.id === id))) {
        const cartAdd = [...cartItens, cart];
        localStorage.setItem('cart', JSON.stringify(cartAdd));
      }
    }
  };

  render() {
    const { productResult, picture } = this.state;
    const { title, price, warranty } = productResult;
    return (
      <div>
        <HeaderDetails />
        <div>
          <img
            data-testid="product-detail-image"
            src={ picture }
            alt={ title }
          />
          <p data-testid="product-detail-name">{ title }</p>
          <p data-testid="product-detail-price">
            R$
            { ' ' }
            { price }
          </p>
          <p>{ warranty }</p>
          <button
            data-testid="product-detail-add-to-cart"
            type="button"
            onClick={ this.onClick }
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default ProductDetails;
