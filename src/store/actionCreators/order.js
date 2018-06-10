import * as actionTypes from './actionTypes';
import axios from '../../axiosOrders';

export const purchageBurgerSuccess = (orderId, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: orderId,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}
export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData, token,userId) => {
  return  dispatch => {
        dispatch( purchaseBurgerStart() );
        axios.post(`/orders.json?auth=${token}`, orderData)
        
        .then(response => {
            // console.log(response, 'response');
            dispatch(purchageBurgerSuccess(response.data.name, response.data.order))
 
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error))
        })
    }
}

export const purchaseInit = () => {
     return {
         type: actionTypes.PURCHASE_INIT
     }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrderSuccess = (order) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        order: order
    }
}

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    
    }
}

export const fetchOrders = (token,userId) => {
    // console.log(userId);
    return dispatch => {
        dispatch(fetchOrderStart())
        const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
        axios.get(`/orders.json${queryParams}`)
        .then(response => {
            // console.log(response);
            const fetchedOrders = [];

            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key 
                })
            }

        dispatch(fetchOrderSuccess(fetchedOrders))
        })
        .catch(error => {
        dispatch(fetchOrderFail(error))
        })
    }
}