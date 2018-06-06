import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axiosOrders';
import WithErrorHandler from '../../withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as orderActions from '../../store/actionCreators/index';

import spinner from '../../components/UI/Spinner/spinner';
import Spinner from '../../components/UI/Spinner/spinner';
class Orders extends Component {


    componentDidMount () {
     this.props.fetchOrders()
    }

    render() {
        let orders = <Spinner />
        if(!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order key={order.id}
                 ingredients={order.ingredients}
                 price={order.totalPrice}
                 /> 
         ))
        }
        return (
            <div>
           {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(orderActions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (WithErrorHandler(Orders, axios));