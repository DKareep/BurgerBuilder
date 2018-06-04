import React from 'react';
import LogoImage from '../../assets/image/burger.jpg';
import classes from './logo.css';
const Logo = (props) => {
    return(
        <div>
            <img className={classes.logoImg} src={LogoImage} />
        </div>
    )
}

export default Logo;