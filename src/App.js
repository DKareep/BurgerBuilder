import React, { Component } from 'react';
import  Layout from './components/layout/Layout';
import BurgerBuilder from './containers/burgerbuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import {Route, Switch, withRouter,Redirect} from 'react-router-dom';
import Auth from './containers/Auth/auth';
import Logout from './containers/Auth/Logout/logout';
import {connect} from 'react-redux';
import * as authActions from './store/actionCreators/index';
class App extends Component {
  componentDidMount() {
    this.props.onCheckAuthState()
  }
  render() {

    let routes = (
      <Switch>
      <Route path="/auth" component={Auth} />
      <Redirect to="/auth" />
      </Switch>   
    )
    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/auth" component={Auth} />
        <Route path="/logout" component={Logout} /> 
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/auth" />
        </Switch>
      )
    }
    return (
      <div>
          <Layout>
            
            {routes}
             
           
          </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    isAuthenticated: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState: () => dispatch(authActions.authCheck())
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
