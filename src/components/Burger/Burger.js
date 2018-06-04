import React, {Component} from 'react';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';
import Classes from './Burger.css';

class Burger extends Component {

    render() {
        let ingredient = Object.keys(this.props.ingredients)
            .map(igKeys => {
                return [...Array(this.props.ingredients[igKeys])].map((_, i) => {
                    return <BurgerIngredient key={igKeys + i} type={igKeys}/>
                })
            })
            .reduce((arr, el) => {
                return arr.concat(el)
            }, []);

        if (ingredient.length === 0) {
            ingredient = <p>Please add ingredients to burger</p>;
        }
        return (
            <div className={Classes.Burger}>
                <BurgerIngredient type="bread-top"/>
                {ingredient}
                <BurgerIngredient type="bread-bottom"/>
            </div>
        )
    }
}

export default Burger;
