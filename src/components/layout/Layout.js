import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Toolbar from '../UI/Navigation/Toolbar/Toolbar';
import styles from './layout.css';
import SideDrawer from '../UI/Navigation/SideDrawer/SideDrawer';

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
            <Toolbar sideDrawerToggleHandler={this.sideDrawerToggleHandler} />
            <SideDrawer showSideBar={this.state.showSideBar} />
        </div>
        <main className={styles.Content}>
            {this.props.children}
        </main>

    </Aux>)
    }
    };

export default Layout;