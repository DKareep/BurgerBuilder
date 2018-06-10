import * as actionTypes from '../actionCreators/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchasing: false
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ORDER_START:
            return {
                ...state,
                loading: true
            }
         

        case actionTypes.FETCH_ORDER_SUCCESS:
        return {
            ...state,
            loading: false,
            orders: action.order
        }   
       
        
        case actionTypes.FETCH_ORDER_FAIL:
            return {
                ...state,
                loading: false,
             
            }
     
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchasing: false
            }
       
        case actionTypes.PURCHASE_BURGER_START: 
                return {
                    ...state,
                    loading: true
                }
          
        case actionTypes.PURCHASE_BURGER_SUCCESS:
        const newOrder = {
            ...action.orderData,
            id: action.orderId
                   }
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                purchasing: true
            }
    
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false,
            }
       
        default:
        return state;
       
    }
}
export default orderReducer;