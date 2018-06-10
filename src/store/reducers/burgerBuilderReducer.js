 import * as actionTypes from '../actionCreators/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: true
}

const INDIVIDUAL_PRICES = {
    salad: .2,
    cheese: .6,
    bacon: .9,
    meat: 1.2
}

const reducer = (state = initialState, action) => {   
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            },
            totalPrice: state.totalPrice + INDIVIDUAL_PRICES[action.ingredientName],
            building: true
            }
  
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
                
                },
                totalPrice: state.totalPrice - INDIVIDUAL_PRICES[action.ingredientName],
                building: true
            }
      

            case actionTypes.SET_INGREDIENTS:
                return {
                    ...state,
                    ingredients: action.ingredients,
                    error:false,
                    totalPrice: 4,
                    building: false
                }
            

            case actionTypes.FETCH_INGREDIENTS_FAILED:
                return {
                    ...state,
                    error: true
                }
         
        default:
            return state;
    }


}

export default reducer;