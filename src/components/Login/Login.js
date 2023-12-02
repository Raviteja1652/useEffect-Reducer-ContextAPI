import React, { useEffect, useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  if (action.type === 'INPUT-USER'){
    return ({value: action.val, isValid: action.val.includes('@')})
  }
  if(action.type === 'INPUT-BLUR'){
    return ({value: state.value, isValid: state.value.includes('@')})
  }
  return ({value: '', isValid: false})
};

const paswReducer = (state, action) => {
  if(action.type === 'USER-PASW'){
    return({value: action.val, isValid: action.val.trim().length > 6})
  }
  if(action.type === 'PASW-BLUR'){
    return({value: state.value, isValid: state.value.trim().length > 6})
  }
  return({value:'', isValid: false})
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredClgName, setEnteredClgName] = useState('');
  const [clgNameIsValid, setclgNameIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null})
  const [paswState, dispatchpasw] = useReducer(paswReducer, {value: '', isValid: null})

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        emailState.isValid && paswState.isValid && enteredClgName.trim().length > 2
      );
    }, 500)
    
    return (() => {
      clearTimeout(identifier)
    })
  }, [emailState.isValid, paswState.isValid, enteredClgName])

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'INPUT-USER', val: event.target.value})
    //setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    dispatchpasw({type: 'USER-PASW', val: event.target.value})
    //setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT-BLUR'})
    //setEmailIsValid(emailState.isValid);
  };

  const validatePasswordHandler = () => {
    dispatchpasw({type: 'PASW-BLUR'})
    //setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const clgNameChangeHandler = (event) => {
    setEnteredClgName(event.target.value);
  };

  const validateClgNameHandler = () => {
    setclgNameIsValid(enteredClgName.trim().length > 2);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, paswState.value, enteredClgName);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            paswState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={paswState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            clgNameIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="clgName">College Name</label>
          <input
            type="text"
            id="clgName"
            value={enteredClgName}
            onChange={clgNameChangeHandler}
            onBlur={validateClgNameHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
