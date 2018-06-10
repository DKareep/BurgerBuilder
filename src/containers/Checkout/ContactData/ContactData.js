import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axiosOrders';
import Spinner from '../../../components/UI/Spinner/spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as orderActions from '../../../store/actionCreators/index';

class ContactData extends Component {
    state = {
        orderForm : {
            name : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    isMinLen: 3
                },
                valid: false
            },
            street : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            zipCode : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your zipcode'
                },
                validation: {
                    required: true
                },
                valid: false,
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                validation: {
                    required: true
                },
                valid: false,
                value: ''
            },
            email : {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                validation: {
                    required: true
                },
                valid: false,
                value: ''
            },
            deliveryMethod : {
                elementType: 'select',
                elementConfig: {
                   options: [
                    {value: 'fastest',  displayValue: 'Fastest'},
                    {value: 'cheapest',  displayValue: 'Cheapest'}
                   ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            },
        },
        loading: false,
        formIsValid: false

    }

    orderHandler = (event) => {
       event.preventDefault();
           
        let formData = {};

        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value
        }
            
       this.setState({loading: true})
       const order = {
           ingredients: this.props.ingredients,
           totalPrice: this.props.totalPrice,
           order: formData,
           userId: this.props.userId
       }
     
       this.props.onOrderBurger(order, this.props.token)
    
      

    }
    checkValidity = (value, rules) => {
        let isValid = true; 
        if(rules.required) {
            isValid = value.trim !== '' && isValid;
        }
        if(rules.isMinLen) {
            isValid = value.length >= rules.isMinLen && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangeHandler = (event, key) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedOrderElement = {
            ...updatedOrderForm[key] 
        }

        updatedOrderElement.value = event.target.value;
        updatedOrderElement.valid = this.checkValidity(updatedOrderElement.value, updatedOrderElement.validation)
        updatedOrderForm[key] = updatedOrderElement;
        // console.log(updatedOrderForm);
        this.setState({orderForm: updatedOrderForm})

    }
    render () {
        let formArrayElements = [];
        for (let key in this.state.orderForm) {
            formArrayElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = formArrayElements.map(formElement => {
                            return (
                                <Input 
                                key={formElement.id}
                                elementType = {formElement.config.elementType}
                                elementConfig = {formElement.config.elementConfig}
                                value={formElement.config.value}
                                changed= {(event) => this.inputChangeHandler(event, formElement.id)}
                                />
                                )
                            });
                    
        if(this.props.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
            <h4>Enter your contact data </h4>
            <form onSubmit={this.orderHandler}>
           {form}
           <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
           </form>
        </div>
        )
   
    }
}
const mapStateToProps = (state) => {
    
    return {
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
            onOrderBurger: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token))
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));