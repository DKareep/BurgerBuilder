import React from 'react';
import classes from './Order.css';
const Order = (props) => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        )
    }

    const ingredientOP = ingredients.map(ig => {
        return (
            <span key={ig.name}
            style={{
                textTransform: 'capitalize',
                border: '1px solid #555'
            }}
            >
                {ig.name} ({ig.amount})
            </span>
        )
    })

    return (
<div className={classes.Order}>
     Ingredients:    {ingredientOP}
    <p>Price: <strong> {Number.parseFloat(props.price).toFixed(2)} Rupees </strong> </p>
 </div>
    )
}

export default Order;