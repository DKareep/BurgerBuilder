import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './auth.css';
import {connect} from 'react-redux';
import * as authActions from '../../store/actionCreators/index';
class Auth extends Component {
    state = {
        controls : {
            email : {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password : {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    isMinLen: 6
                    
                },
                valid: false
            },
        }
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
    inputChangeHandler = (event, controlName) => {

        const updatedControls = {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
 
        

        this.setState({controls: updatedControls})

    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
    console.log('ex')
    }
    render () {
        let formArrayElements = [];
        for (let key in this.state.controls) {
            formArrayElements.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = formArrayElements.map(formElement => {
                            return (
                                <Input 
                                key={formElement.id}
                                elementType = {formElement.config.elementType}
                                elementConfig = {formElement.config.elementConfig}
                                value={formElement.config.value}
                                invalid={!formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                changed= {(event) => this.inputChangeHandler(event, formElement.id)}
                                />
                                )
                            })
                       
        return (
             <div className={classes.Auth}> 
             <form onSubmit={this.submitHandler}> 
                    {form}
                    <Button btnType="Success" > Signup</Button>
                    </form>
                    </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password) => dispatch(authActions.auth(email, password))
    }
}

export default connect(null,mapDispatchToProps)(Auth);