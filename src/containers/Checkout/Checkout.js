import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';
import * as orderActions from '../../store/actionCreators/index';
class Checkout extends Component {

    state = {
        ingredients: null,
        totalPrice: 0
    };

    componentWillMount() {
 
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            console.log(param);
            if(param[0] == 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
            
        }
        this.setState({ingredients: ingredients, totalPrice: price}, () => {
            console.log(this.state.ingredients)
        })
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    componentDidMount() {
        console.log(this.state.ingredients, 'this.state.ingredients');
    }

    render () {

        let summary = <Redirect to="/" />;

    if(Object.keys(this.state.ingredients).length > 0) {
        let purchaseRedirect = this.props.purchasing ? <Redirect to="/" /> : null;
        summary = (
           
            <div>
                {purchaseRedirect}
                <CheckoutSummary 
                ingredients={this.state.ingredients}
                checkoutCancelHandler={this.checkoutCancelHandler}
                checkoutContinueHandler={this.checkoutContinueHandler}
                />
                <Route path={this.props.match.path + '/contact-data'} 
                                render={(props) => (<ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props} />)} />
            </div>
        )
    }

        return summary;
    }
}
const mapStateToProps = state => {
    return {
        purchasing: state.order.purchasing
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         purchaseInit:() => dispatch(orderActions.purchaseInit())
//     }
// }

export default connect(mapStateToProps)(Checkout);