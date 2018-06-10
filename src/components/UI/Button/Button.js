import React from 'react';

import classes from './Button.css';


const Button = (props) => {
    return(
        <button
        className={[classes.Button, classes[props.btnType]].join(' ')}
        name={props.name ? props.name : ''}
        onClick={props.clicked}
        >
            {props.children}
        </button>
    )
}

export default Button;