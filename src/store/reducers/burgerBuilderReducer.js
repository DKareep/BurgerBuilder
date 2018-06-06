 import * as actionTypes from '../actionCreators/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INDIVIDUAL_PRICES = {
    salad: .2,
    cheese: .6,
    bacon: .9,
    meat: 1.2
}

const reducer = (state = initialState, action) => {
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

            case actionTypes.SET_INGREDIENTS:
                return {
                    ...state,
                    ingredients: action.ingredients,
                    error:false,
                    totalPrice: 4
                }
                break;

            case actionTypes.FETCH_INGREDIENTS_FAILED:
                return {
                    ...state,
                    error: true
                }
            break;
            
        default:
            return state;
    }


}

export default reducer;