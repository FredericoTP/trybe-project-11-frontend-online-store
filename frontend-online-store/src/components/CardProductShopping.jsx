import React from 'react';
import PropTypes from 'prop-types';

class CardProductShopping extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      itemQuantity: 0,
    };
  }

  componentDidMount() {
    const { item } = this.props;
    const { id, quantity } = item;
    const itensCart = JSON.parse(localStorage.getItem('cart'));
    itensCart.forEach((e) => {
      if (e.id === id) {
        this.setState({
          cart: e,
        });
      }
    });
    this.setState({
      itemQuantity: quantity,
    });
  }

  componentDidUpdate() {
    const { item } = this.props;
    const { id } = item;
    const itensCart = JSON.parse(localStorage.getItem('cart'));
    const { cart } = this.state;
    itensCart.map((e, index) => {
      if (e.id === id) {
        itensCart[index] = cart;
      }
      return '';
    });
    localStorage.setItem('cart', JSON.stringify(itensCart));
  }

  onClickDecrease = () => {
    const { item } = this.props;
    const { id, thumbnail, title, price } = item;
    this.setState((prevState) => ({
      cart: {
        id,
        thumbnail,
        title,
        price,
        quantity: prevState.cart.quantity - 1,
      },
      itemQuantity: prevState.itemQuantity - 1,
    }));
  };

  onClickIncrease = () => {
    const { item } = this.props;
    const { id, thumbnail, title, price } = item;
    this.setState((prevState) => ({
      cart: {
        id,
        thumbnail,
        title,
        price,
        quantity: prevState.cart.quantity + 1,
      },
      itemQuantity: prevState.itemQuantity + 1,
    }));
  };

  onClickRemove = () => {
    const { item, updateComponent } = this.props;
    const { id: idProduct } = item;
    const itensCart = JSON.parse(localStorage.getItem('cart'));
    let elementIndex = 0;
    itensCart.forEach((e, index) => {
      if (e.id === idProduct) {
        elementIndex = index;
      }
    });
    itensCart.splice(elementIndex, 1);
    localStorage.setItem('cart', JSON.stringify(itensCart));
    updateComponent();
  };

  render() {
    const { itemQuantity } = this.state;
    const { item } = this.props;
    const { price, thumbnail, title } = item;

    return (
      <div>
        <img src={ thumbnail } alt={ title } />
        <p data-testid="shopping-cart-product-name">{ title }</p>
        <button
          data-testid="product-decrease-quantity"
          type="button"
          onClick={ this.onClickDecrease }
          disabled={ itemQuantity === 1 }
        >
          Diminuir
        </button>
        <p data-testid="shopping-cart-product-quantity">{ itemQuantity }</p>
        <button
          data-testid="product-increase-quantity"
          type="button"
          onClick={ this.onClickIncrease }
        >
          Aumentar
        </button>
        <p>
          R$
          { ' ' }
          { price }
        </p>
        <button
          data-testid="remove-product"
          type="button"
          onClick={ this.onClickRemove }
        >
          Remover Produto
        </button>
      </div>
    );
  }
}

CardProductShopping.propTypes = {
  item: PropTypes.shape({
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    quantity: PropTypes.number,
    id: PropTypes.string,
  }).isRequired,
  updateComponent: PropTypes.func.isRequired,
};

export default CardProductShopping;
