import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Toolbar from '../UI/Navigation/Toolbar/Toolbar';
import styles from './layout.css';
import SideDrawer from '../UI/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component {
    
    state = {
        showSideBar: true
    }
    closeSidedrawer= () => {

            this.setState ({
                showSideBar:false
            })
    }
    sideDrawerToggleHandler = () => {
        console.log('clicked')
        this.setState((prevState)=> {
            return {showSideBar: !prevState.showSideBar}
        })

    }   

    render () {
        return (
        <Aux>
        <div>
            <Toolbar isAuth={this.props.isAuthenticated} sideDrawerToggleHandler={this.sideDrawerToggleHandler} />
            <SideDrawer isAuth={this.props.isAuthenticated} showSideBar={this.state.showSideBar} />
        </div>
        <main className={styles.Content}>
            {this.props.children}
        </main>

    </Aux>)
    }
 };

 const mapStateToProps = state => {
     return {
         isAuthenticated: state.auth.token !== null
     }
 }

export default connect(mapStateToProps)(Layout);