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
