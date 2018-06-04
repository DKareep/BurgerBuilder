import React,{Component} from 'react';
import PropTypes from 'prop-types';
import BurgerTop from '../../../assets/image/burgertop.png';
import BurgerBottom from '../../../assets/image/burgerbottom.png';
import classes from './BurgerIngredients.css';

class BurgerIngredients extends Component{
    render () {
        let ingredient = null;

        switch (this.props.type) {
            case ('bread-bottom'):
                ingredient = <div className={classes.BreadBottom}><img src={BurgerBottom} /></div>;
                break;
            case ('bread-top'):
                ingredient = (
                    <div className={classes.BreadTop}>
   <img src={BurgerTop} />
                    </div>
                );
                break;

            case ('meat'):
                ingredient = <div className={classes.Meat}></div>;
                break;

            case ('cheese'):
                ingredient = <div className={classes.Cheese}></div>;
                break;

            case ('salad'):
                ingredient = <div className={classes.Salad}></div>;
                break;
            case ('bacon'):
                ingredient = <div className={classes.Bacon}></div>;
                break;
            default:
                ingredient = null;
        }
        return ingredient;
    }
}

BurgerIngredients.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredients;