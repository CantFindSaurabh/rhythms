import "./Login.css";

import validator from "validator";

import { Link } from "react-router-dom";
import { useState } from "react";
import { connect } from 'react-redux';

import Backdrop from "../../ui/Backdrop/Backdrop";
import Spinner from "../../ui/Spinner/Spinner";

import loginIcon from "../../../assets/images/user-icon-2.png";
import emailIcon from "../../../assets/images/email.png";
import lockIcon from "../../../assets/images/padlock.png";

import { loginUser, updateErrorState } from "../../../store/actions/user";

const Login = (props) => {

  const [formState, setFormState] = useState({
    email: "",
    password: ""
  });

  const updateEmail = (e) => {
    setFormState({
      ...formState,
      email: e.target.value,
    });
  };

  const updatePassword = (e) => {

    setFormState({
      ...formState,
      password: e.target.value,
    });
  };

  const loginUser = (e) => {
    e.preventDefault();

    if (!validator.isEmail(formState.email)) {
      props.updateError({
        login: {
          email: "Email is invalid"
        }
      })

      return;
    }
    else {
      props.updateError({
        login: {
          email: "",
          password: ""
        }
      })
    }

    props.loginUser(formState.email, formState.password);
  };


  if (props.isFetchingState) {
    return (
      <Backdrop>
        <Spinner />
      </Backdrop>
    );
  }

  return (
    <form className="Login" onSubmit={loginUser}>
      <div>
        <img src={loginIcon} className="login-icon" alt="login-icon" />
        <p>LOGIN</p>
      </div>

      <div className="details">
        <div className="input-box blue">

          <div className="header">
            <img src={emailIcon} alt="user-icon" />
            <p>Email</p>
          </div>

          <div className="footer">
            <input
              type="text"
              placeholder="123@xyz.com"
              required
              onChange={updateEmail}
              value={formState.email}
            />
            <p className="error-label">{props.errorState.email}</p>
          </div>
        </div>

        <div className="input-box peach">
          <div className="header">
            <img src={lockIcon} alt="lock-icon" />
            <p>Password</p>
          </div>

          <div className="footer">
            <input
              type="password"
              placeholder="*****"
              required
              onChange={updatePassword}
              value={formState.password}
            />
            <p className="error-label">{props.errorState.password}</p>
          </div>
        </div>

        <input type="submit" value="Login" />
        <Link to="/authenticate/forgot-pass"> Forgot Password? </Link>
      </div>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    errorState: state.user.error.login,
    isFetchingState: state.user.isFetching
  }
}

const mapActionsToProps = dispatch => {
  return {
    loginUser: (email, password) => dispatch(loginUser(email, password)),
    updateError: error => dispatch(updateErrorState(error))
  }
}

export default connect(mapStateToProps, mapActionsToProps)(Login);
