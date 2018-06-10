import React from 'react';
import classes from './toolbar.css';
import Logo from '../../../Logo/logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle sideDrawerToggleHandler={props.sideDrawerToggleHandler}/>
            <Logo />
            <nav className={classes.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth}/> 
            </nav>
        </header>
    )
}

export default Toolbar;