 import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        bacon: 0,
        meat: 0
    },
    totalPrice: 4
}

const INDIVIDUAL_PRICES = {
    salad: .2,
    cheese: .6,
    bacon: .9,
    meat: 1.2
}

const reducer = (state= initialState, action) => {
    console.log(action);
    
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            console.log(action)
            return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            },
            totalPrice: state.totalPrice + INDIVIDUAL_PRICES[action.ingredientName]
            
            }
            break;
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
                
                },
                totalPrice: state.totalPrice - INDIVIDUAL_PRICES[action.ingredientName]
            }
            break;
        default:
            return state;
    }


}

export default reducer;