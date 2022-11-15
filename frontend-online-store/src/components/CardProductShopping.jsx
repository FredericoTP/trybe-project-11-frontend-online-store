import React from 'react';
import PropTypes from 'prop-types';
import '../style/CardProductShopping.css';

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
    const { item, countItensIncreaseDecrease } = this.props;
    const { id, thumbnail, title, price, availableQuantity } = item;
    this.setState((prevState) => ({
      cart: {
        id,
        thumbnail,
        title,
        price,
        quantity: prevState.cart.quantity - 1,
        availableQuantity,
      },
      itemQuantity: prevState.itemQuantity - 1,
    }));
    countItensIncreaseDecrease('decrease')
  };

  onClickIncrease = () => {
    const { itemQuantity } = this.state;
    const { item, countItensIncreaseDecrease } = this.props;
    const { id, thumbnail, title, price, availableQuantity } = item;
    if (itemQuantity < availableQuantity) {
      this.setState((prevState) => ({
        cart: {
          id,
          thumbnail,
          title,
          price,
          quantity: prevState.cart.quantity + 1,
          availableQuantity,
        },
        itemQuantity: prevState.itemQuantity + 1,
      }));
      countItensIncreaseDecrease('increase')
    }
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
      <div className="card-shopping-container">
        <div className="card-shopping-img-title">
          <img src={ thumbnail } alt={ title } />
          <p
            className="shopping-cart-textbold"
            data-testid="shopping-cart-product-name"
          >
            { title }
          </p>
        </div>
        <div className="card-shopping-quantity">
          <div>
            <p className="shopping-cart-textbold">Quantidade:</p>
          </div>
          <div className="card-shopping-quantity-change">
            <button
              className="btn btn-outline-dark quantity-btn"
              data-testid="product-decrease-quantity"
              type="button"
              onClick={ this.onClickDecrease }
              disabled={ itemQuantity === 1 }
            >
              -
            </button>
            <p data-testid="shopping-cart-product-quantity">{ itemQuantity }</p>
            <button
              className="btn btn-outline-dark quantity-btn"
              data-testid="product-increase-quantity"
              type="button"
              onClick={ this.onClickIncrease }
            >
              +
            </button>
          </div>
        </div>
        <div className="shopping-cart-price">
          <p className="shopping-cart-textbold">
            R$
            { ' ' }
            { (price * itemQuantity).toFixed(2) }
          </p>
        </div>
        <div className="shopping-cart-remove">
          <button
            className="btn btn-outline-dark shopping-cart-textbold"
            data-testid="remove-product"
            type="button"
            onClick={ this.onClickRemove }
          >
            Remover Produto
          </button>
        </div>
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
    availableQuantity: PropTypes.number,
  }).isRequired,
  updateComponent: PropTypes.func.isRequired,
  countItensIncreaseDecrease: PropTypes.func.isRequired,
};

export default CardProductShopping;
