import * as actionTypes from './actionTypes';
import axios from '../../axiosOrders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}


export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = (ingredients) =>{
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}
export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredient = () => {
    console.log('ingredients')
   return dispatch => {
        axios.get('https://brugercart.firebaseio.com/ingredients.json')
        .then ( response => {
            dispatch(setIngredients(response.data))
            console.log(response.data)
        }

        )
        .catch( error => {
            dispatch (fetchIngredientsFailed())
        })
   }
}