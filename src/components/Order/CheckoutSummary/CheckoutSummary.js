import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import Classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    console.log(props.ingredients)
    return (
        <div className={Classes.CheckoutSummary}>
            <h1> Check out summary </h1>
            <div style={{width:"100%", margin: "auto"}}>
            <Burger ingredients={props.ingredients}/>
            </div>

              <Button btnType="Danger" clicked={props.checkoutCancelHandler}>Cancel </Button>
              <Button btnType="Success" clicked={props.checkoutContinueHandler}>Continue </Button>
        </div>
    )
}

export default checkoutSummary;