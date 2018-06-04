import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import Classes from './BuildControls.css';
const controls = [
    {label: 'Meat', type: 'meat'},
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'}
];


const BuildControls = (props) => {

    return (
        <div className={Classes.BuildControls}>
            <p>Total Price: <strong>{props.price.toFixed(2)}</strong></p>

            {controls.map((ctrl,i) => {
              return  <BuildControl
                  key={i}
                  label={ctrl.label}
                  type={ctrl.type}
                  addIngredients = {() => {
                      console.log('clicked');
                   return props.addIngredients(ctrl.type); } }
                  removeIngredients = {() => props.removeIngredients(ctrl.type)}
                  disabled={props.disabled[ctrl.type]}

              />
            })}

            <button className={Classes.OrderButton}
                    disabled={!props.purchasable}
                    onClick={props.orderActive}
            >Order Now</button>
        </div>
    )
};

export default BuildControls;