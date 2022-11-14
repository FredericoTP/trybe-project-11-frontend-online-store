import React from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import HeaderDetails from '../components/HeaderDetails';
import FormDetails from '../components/FormDetails';

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      productResult: [],
      picture: '',
      loading: true,
      count: 0,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const response = await getProductById(id);
    this.countItens();
    this.setState({
      id,
      productResult: response,
      picture: response.pictures[0].url,
      loading: false,
    });
  }

  onClick = () => {
    const { productResult } = this.state;
    const {
      id,
      price,
      thumbnail,
      title,
      available_quantity: availableQuantity,
    } = productResult;
    const cart = { id, price, thumbnail, title, quantity: 1, availableQuantity };
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([cart]));
    } else {
      const cartItens = JSON.parse(localStorage.getItem('cart'));
      if (!(cartItens.some((item) => item.id === id))) {
        const cartAdd = [...cartItens, cart];
        localStorage.setItem('cart', JSON.stringify(cartAdd));
      }
    }
    this.countItens();
  };

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
    const {
      productResult,
      picture,
      id,
      loading,
      count,
    } = this.state;
    const { title, price, warranty, shipping } = productResult;
    if (loading) {
      return (
        <div>
          <HeaderDetails count={ count } />
          <p>Loading...</p>
        </div>
      );
    }
    return (
      <div>
        <HeaderDetails count={ count } />
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
          {
            shipping.free_shipping ? (
              <p data-testid="free-shipping">Frete Grátis</p>
            ) : null
          }
          <p>{ warranty }</p>
          <button
            data-testid="product-detail-add-to-cart"
            type="button"
            onClick={ this.onClick }
          >
            Adicionar ao Carrinho
          </button>
        </div>
        <div>
          <FormDetails
            id={ id }
          />
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
