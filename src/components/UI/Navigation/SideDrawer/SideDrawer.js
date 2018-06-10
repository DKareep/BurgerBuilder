import React, {Component} from 'react';

import Logo from '../../../Logo/logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import Aux from '../../../../hoc/Aux';
import classes from './SideDrawer.css';

class SideDrawer extends Component {


       render() {
        let attachedClasses = [classes.SideDrawer, classes.Close];
        if (this.props.showSideBar) {
            attachedClasses = [classes.SideDrawer, classes.Open];
        }
        return (
            <Aux>
          
          {/* <BackDrop
             show={this.state.showSideBar} 
            clicked={this.closeSidedrawer} /> */}

            <div className={attachedClasses.join(' ')}>
                                       <Logo />
                    <nav>
                    <NavigationItems /> 
                    </nav>
                </div >
                </Aux>
                )
    }
 
} 

export default SideDrawer;