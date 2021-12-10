import './Signup.css'

import validator from 'validator';

import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Backdrop from '../../ui/Backdrop/Backdrop';
import Spinner from '../../ui/Spinner/Spinner';

import { sendSignupOtp, signupUser, updateErrorState } from '../../../store/actions/user';

import userIcon from '../../../assets/images/user-icon-1.png';
import emailIcon from '../../../assets/images/email.png';
import lockIcon from '../../../assets/images/padlock.png';
import otpIcon from '../../../assets/images/otp.png';

const Signup = props => {

    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        otp: "",
        btnClicked: false
    })

    const [timerState, setTimerState] = useState({
        time: 0
    })

    useEffect(() => {

        let timer;

        if (timerState.time > 0) {
            timer = setTimeout(() => setTimerState({ time: timerState.time - 1 }), 1000);
        }
        else {
            clearInterval(timer);
        }
    });


    const updateName = e => {

        setFormState({
            ...formState,
            name: e.target.value
        })

        if (e.target.value.length < 3) {
            props.updateError({
                signup: {
                    name: "Too Short"
                }
            })

            return;
        }

        props.updateError({
            signup: {
                name: ""
            }
        })

    }
    const updateEmail = e => {

        setFormState({
            ...formState,
            email: e.target.value
        })

        if (!validator.isEmail(e.target.value)) {
            props.updateError({
                signup: {
                    email: "Email is Invalid"
                }
            })

            return;
        }

        props.updateError({
            signup: {
                email: ""
            }
        })
    }
    const updatePassword = e => {
        setFormState({
            ...formState,
            password: e.target.value
        })


        const regex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%@&? "]).*$/;

        if (!regex.test(e.target.value)) {
            props.updateError({
                signup: {
                    password: "Password Invalid"
                }
            })

            return
        }

        props.updateError({
            signup: {
                password: ""
            }
        })

    }
    const updateOtp = e => {
        setFormState({
            ...formState,
            otp: e.target.value
        })
    }


    const isFormValid = () => {
        let isValid = true;

        const errors = Object.keys(props.errorState);
        errors.splice(errors.indexOf('otp'), 1);

        errors.forEach(error => {
            if (props.errorState[error] !== "") {
                isValid = false;
            }
        })

        if (validator.isEmpty(formState.name) || validator.isEmpty(formState.email) || validator.isEmpty(formState.password)) {
            isValid = false;
        }

        return isValid;
    }

    const sendOtp = e => {

        setFormState({
            ...formState,
            btnClicked: true
        })

        if (!isFormValid()) {
            return;
        }

        props.sendOtp(formState.email);

        setTimerState({
            time: 15
        })
    }

    const signupUser = e => {
        e.preventDefault();

        setFormState({
            ...formState,
            btnClicked: true
        })

        if (!isFormValid()) {
            return;
        }

        props.signup(formState.name, formState.email, formState.password, formState.otp)
    }


    if (props.fetchingState) {
        return (
            <Backdrop>
                <Spinner />
            </Backdrop>
        );
    }
    return (
        <form className="Signup" onSubmit={signupUser}>
            <div>
                <p className="heading">SIGNUP</p>
            </div>

            <div className="details">
                <div className="input-box blue">

                    <div className="header">
                        <img src={userIcon} alt="user-icon" />
                        <p>Name</p>
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="John"
                            required
                            onChange={updateName}
                            value={formState.name}
                            title="name"
                        />
                        <p className="error-label">{formState.btnClicked ? props.errorState.name : ""}</p>
                    </div>
                </div>

                <div className="input-box peach">

                    <div className="header">
                        <img src={emailIcon} alt="email-icon" />
                        <p>Email</p>
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="123@xyz.com"
                            required
                            onChange={updateEmail}
                            value={formState.email}
                            title="email"
                        />
                        <p className="error-label">{formState.btnClicked ? props.errorState.email : ""}</p>
                    </div>
                </div>

                <div className="input-box blue">

                    <div className="header">
                        <img src={lockIcon} alt="lock-icon" />
                        <p>Password</p>

                    </div>
                    <p className="password-instructions">Minimum 8 characters, at least 1 uppercase letter, 1 lowercase , 1 number and 1 special character</p>

                    <div>
                        <input
                            type="password"
                            placeholder="*****"
                            required
                            onChange={updatePassword}
                            value={formState.password}
                            title="password"
                        />
                        <p className="error-label">{formState.btnClicked ? props.errorState.password : ""}</p>
                    </div>

                </div>

                <div className="input-box peach">

                    <div className="header">
                        <img src={otpIcon} alt="lock-icon" />
                        <p>OTP</p>
                    </div>

                    <div>
                        <input
                            type="number"
                            placeholder="123456"
                            required
                            onChange={updateOtp}
                            value={formState.otp}
                            title="otp"
                        />
                        <input type="button" onClick={sendOtp} value={timerState.time > 0 ? timerState.time : "Send"} className="otp-send-btn" disabled={timerState.time > 0 ? true : false} />
                        <p className="error-label">{formState.btnClicked ? props.errorState.otp : ""}</p>
                    </div>
                </div>
            </div>
            <input type="submit" value="Signup" />
        </form>
    )
}

const mapStateToProps = state => {
    return {
        fetchingState: state.user.isFetching,
        errorState: state.user.error.signup
    }
}

const mapActionsToProps = dispatch => {
    return {
        sendOtp: email => dispatch(sendSignupOtp(email)),
        signup: (name, email, password, otp) => dispatch(signupUser(name, email, password, otp)),
        updateError: error => dispatch(updateErrorState(error))
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Signup);