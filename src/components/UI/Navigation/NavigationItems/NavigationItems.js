import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';
const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}> 
           {props.isAuth ? <NavigationItem link="/" exact>Burger Builder</NavigationItem>: null}
          {props.isAuth ?  <NavigationItem link="/orders">Orders</NavigationItem> : null }
         {!props.isAuth ?  <NavigationItem link="/auth">Auth</NavigationItem> :
         <NavigationItem link="/logout">Logout</NavigationItem>
        }
        </ul>
    )
}

export default NavigationItems;