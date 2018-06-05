import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axiosOrders';
import Spinner from '../../components/UI/Spinner/spinner';
import withErorrHandler from '../../withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actionCreators/actionTypes';
import * as burgerActions from '../../store/actionCreators/index';


class BurgerBuilder extends Component {
    state = {
        purchasing: false
            }

    isPurchasable = (ingredients) => {
            let sum = Object.keys(ingredients)
            .map(igKeys=> {
                return ingredients[igKeys]
            })
            .reduce((sum,el)=> {
              return  sum = sum + el;
            }, 0)
        return sum > 0

    }
   /* addIngredients = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice + INDIVIDUAL_PRICES[type];
        this.setState({totalPrice: newPrice, ingredients:updatedIngredients })
        this.isPurchasable(updatedIngredients)
    }
    removeIngredients = (type) => {

        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice - INDIVIDUAL_PRICES[type];
        this.setState({totalPrice: newPrice, ingredients:updatedIngredients })
        this.isPurchasable(updatedIngredients)
    } */
    purchasingHandler = ()  => {
        this.setState({
            purchasing: true
        })
    }
    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        }) 
    }
    purchaseContinueHandler = () => {
        const queryParams = [];

        for (let i in this.props.ings) {
            queryParams.push(encodeURIComponent(i) +  '=' + encodeURIComponent(this.props.ings[i]))
        }
        queryParams.push('price=' + this.props.price)
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString 

        })
    }
     componentDidMount() {
        this.props.onInitIngredients();
     }

    render() {
        let disabledInfo = {
            ...this.props.ing
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0;
        }
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if(this.props.ings) {
            burger = (
                <Aux>
                <Burger ingredients={this.props.ings}/>
                <BurgerControls
                addIngredients = {this.props.onIngredientsAdd}
                removeIngredients = {this.props.onIngredientsRemove}
                disabled = {disabledInfo}
                price = {this.props.price}
                purchasable = {this.isPurchasable(this.props.ings)}
                orderActive={this.purchasingHandler}
                />
                    </Aux>
            
            )
        }

        let orderSum = null;
       
       orderSum = <OrderSummary
                            totalPrice = {this.props.price}
                            ingredients={this.props.ings}
                            purchaseCancelHandler={this.purchaseCancelHandler}
                            purchaseContinueHandler={this.purchaseContinueHandler}
                        />;
        if(!this.props.ings) {
            orderSum = <Spinner />
        }
        return (
            <Aux>
                <Modal
                show={this.state.purchasing}
                modelClosed = {this.purchaseCancelHandler}>
                   {orderSum}
                </Modal>
               {burger}
            </Aux>
        )
    }
    
}
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientsAdd: (igName) => dispatch(burgerActions.addIngredient(igName)),
        onIngredientsRemove: (igName) => dispatch(burgerActions.removeIngredient(igName)),
        onInitIngredients: () => { 
            console.log('[onInitIngredients] fired')
            return dispatch(burgerActions.initIngredient()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErorrHandler(BurgerBuilder,axios));