import React, { Component } from 'react';

import  Layout from './components/layout/Layout';
import BurgerBuilder from './containers/burgerbuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import {Route, Switch} from 'react-router-dom';
import Auth from './containers/Auth/auth';

class App extends Component {
  render() {
    return (
      <div>
          <Layout>
            <Switch>
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" component={Orders} />
              <Route path="/auth" component={Auth} />
              <Route path="/" exact component={BurgerBuilder} />     
            </Switch>
          </Layout>
      </div>
    );
  }
}

export default App;
