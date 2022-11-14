import React from 'react';
import CheckoutProducts from '../components/CheckoutProducts';
import FormCheckout from '../components/FormCheckout';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItens: [],
      haveItens: false,
      total: 0,
    };
  }

  componentDidMount() {
    const cart = localStorage.getItem('cart');
    if (cart === null) {
      localStorage.setItem('cart', []);
    }
    if (cart.length > 0) {
      let sum = 0;
      JSON.parse(cart).forEach((item) => {
        const { price, quantity } = item;
        const total = price * quantity;
        sum += total;
      });
      this.setState({
        haveItens: true,
        cartItens: JSON.parse(cart),
        total: sum,
      });
    }
  }

  render() {
    const { cartItens, haveItens, total } = this.state;
    return (
      <div>
        <CheckoutProducts
          cartItens={ cartItens }
          haveItens={ haveItens }
        />
        {
          total === 0 ? null : (
            <p>
              Preço total:
              { ' ' }
              R$
              { total.toFixed(2) }
            </p>
          )
        }
        <div>
          <FormCheckout />
        </div>
      </div>
    );
  }
}

export default Checkout;
