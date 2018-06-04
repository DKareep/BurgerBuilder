import React from 'react';

import Classes from './BuildControl.css';

const BuildControls = (props) => {
    return (
        <div className={Classes.BuildControl}>
            <div className={Classes.Label}>{props.label}</div>
            <button className={Classes.Less} onClick={props.removeIngredients} disabled={props.disabled}>less</button>
            <button className={Classes.More} onClick={props.addIngredients} >more</button>
        </div>
    )
};
export default BuildControls;