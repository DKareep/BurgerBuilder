import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axiosOrders';
import Spinner from '../../../components/UI/Spinner/spinner';
import Input from '../../../components/UI/Input/Input';

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
                value: ''
            },
        },
        loading: false

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
           order: formData
       }
       axios.post('/orders.json  ', order)
       .then(response => {
           console.log(response)
           this.setState({loading: false})
           this.props.history.push('/');

       })
       .catch(error => {
           console.log(error);
           this.setState({loading: false})
       })

    }
    checkValidity = (value, rules) => {
        let isValid = true; 
        if(rules.required) {
            isValid = value.trim !== '' && isValid;
        }
        if(rules.isMinLen) {
            isValid = value.length >= rules.isMinLen && isValid;
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
console.log(updatedOrderForm);
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
        console.log(formArrayElements,'formArrayElements')

        let form = ( <form onSubmit={this.orderHandler}>
           
          {formArrayElements.map(formElement => {
              return (
                  <Input 
                  key={formElement.id}
                  elementType = {formElement.config.elementType}
                  elementConfig = {formElement.config.elementConfig}
                  value={formElement.config.value}
                  changed= {(event) => this.inputChangeHandler(event, formElement.id)}
                  />
              )
              
          })}
          
            <Button btnType="Success"
            
            > ORDER NOW </Button>
                 </form>);
        if(this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
            <h4>Enter your contact data </h4>
           {form}
        </div>
        )
   
    }
}
export default ContactData;