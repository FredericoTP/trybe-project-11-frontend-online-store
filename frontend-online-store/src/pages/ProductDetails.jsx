import React from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import HeaderDetails from '../components/HeaderDetails';
import FormDetails from '../components/FormDetails';
import Footer from '../components/Footer';
import '../style/ProductDetails.css';
import free from '../images/free.png'

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
        <div className="details-loading-container">
          <div className="details-loading-header">
            <HeaderDetails count={ count } />
          </div>
          <div className="details-loading">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="details-container">
        <HeaderDetails count={ count } />
        <div className="card mb-3 details-card">
          <div className="row g-0">
            <div className="col-md-4 details-align-image">
              <img
                className="img-fluid rounded-start details-img-product"
                data-testid="product-detail-image"
                src={ picture }
                alt={ title }
              />
            </div>
            <div className="col-md-8 details-product-details">
              <div className="card-body">
                <p
                  className="card-title details-text-change"
                  data-testid="product-detail-name"
                >
                  { title }
                </p>
                  <p
                    className="card-title details-text-change"
                    data-testid="product-detail-price"
                  >
                    R$
                    { ' ' }
                    { (price > 0) ? (price.toFixed(2)) : 0 }
                  </p>
                  {
                    shipping.free_shipping ? (
                      <img
                        className="img-free-shipping"
                        src={ free }
                        alt="frete grátis"
                        data-testid="free-shipping"
                      />
                    ) : null
                  }
                  <p className="card-title details-text-change">{ warranty }</p>
                  <button
                    className="btn btn-outline-dark details-text-change"
                    data-testid="product-detail-add-to-cart"
                    type="button"
                    onClick={ this.onClick }
                  >
                    Adicionar ao Carrinho
                  </button>
              </div>
            </div>
          </div>
        </div>
        <div className="details-form">
          <FormDetails
            id={ id }
          />
        </div>
        <Footer />
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
