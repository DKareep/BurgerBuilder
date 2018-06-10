import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axiosOrders';
import WithErrorHandler from '../../withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as orderActions from '../../store/actionCreators/index';
import Spinner from '../../components/UI/Spinner/spinner';
class Orders extends Component {


    componentDidMount () {
     this.props.fetchOrders(this.props.token,this.props.userId)
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
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token,userId) => dispatch(orderActions.fetchOrders(token,userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (WithErrorHandler(Orders, axios));