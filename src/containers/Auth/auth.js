import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/spinner';
import Button from '../../components/UI/Button/Button';
import classes from './auth.css';
import {connect} from 'react-redux';
// import {Redirect} from 'react-router-dom';
import * as authActions from '../../store/actionCreators/index';
// import { FETCH_INGREDIENTS_FAILED } from '../../store/actionCreators/actionTypes';
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
        },

    }
    componentDidMount() {
        // console.log(this.props.buildingBurger, 'onSetAuthRedirect');
        // if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            
        //     this.props.onSetAuthRedirect()
        // }

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
       let buttonType = event.target.name;
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, buttonType);
       
  
    }
   
    componentDidUpdate() {
        if(this.props.isAuthenticated) {
            //console.log(this.props.authRedirectPath)
            // authRedirectComponent = <Redirect to={this.props.authRedirectPath} />
        this.props.history.push('/')
        }
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

        if (this.props.loading) {
            form = <Spinner />
        }        
        let errorMessage = null;      
        if(this.props.error) {
            errorMessage =  (
                <p style={{'color': 'red', 'textAlign': 'center'}}>{this.props.error}</p>
            )
            // console.log(errorMessage);
        }              

   
                       
        return (
             <div className={classes.Auth}> 
         
             {errorMessage}
             <form > 
                    {form}
                    <Button name='signup' clicked={(e) => {this.submitHandler(e)}} btnType="Success" > Signup</Button>
                    <Button name='signin' clicked={(e) => {this.submitHandler(e)}} btnType="Success" > Signin</Button>
                    </form>
                    </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
      
    }
    //  authRedirectPath: state.auth.authRedirect,
    // buildingBurger: state.auth.buildingBurger 
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, btnType) => dispatch(authActions.auth(email, password,btnType)),
       
    }
    //  onSetAuthRedirect: () => dispatch(authActions.authRedirect('/'))
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);