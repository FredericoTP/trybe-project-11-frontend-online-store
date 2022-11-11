import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  return (
    <Switch>
      <Route exact path="/shoppingcart" component={ ShoppingCart } />
      <Route exact path="/" component={ Home } />
    </Switch>
  );
}

export default App;