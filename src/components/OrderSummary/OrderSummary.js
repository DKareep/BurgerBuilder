import React from 'react';
import Button from '../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredients = Object.keys(props.ingredients)
        .map(igKey => {
        return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>  :  {props.ingredients[igKey]}</li>
    });
    return (
        <div>
            <p>Your order</p>
            <p>Ingredients of delicious burger you made</p>

            <ul>
                {ingredients}
            </ul>
            <p> Total Price: <strong>{props.totalPrice.toFixed(2)}</strong> </p>
            <p>Want to checkout ? </p>
        <Button btnType='Danger' clicked={props.purchaseCancelHandler}>CANCEL </Button>
        <Button btnType='Success' clicked={props.purchaseContinueHandler}>CONTINUE </Button>

        </div>
    )
};

export default OrderSummary;