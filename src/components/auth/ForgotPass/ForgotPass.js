import './ForgotPass.css'

import validator from 'validator';

import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Backdrop from '../../ui/Backdrop/Backdrop';
import Spinner from '../../ui/Spinner/Spinner';

import { resetPassword, sendResetPasswordOtp, updateErrorState } from '../../../store/actions/user';

import userIcon from '../../../assets/images/user-icon-2.png';
import emailIcon from '../../../assets/images/email.png';
import lockIcon from '../../../assets/images/padlock.png';
import otpIcon from '../../../assets/images/otp.png';

const ForgotPass = props => {

    const [formState, setFormState] = useState({
        email: "",
        otp: "",
        password: "",
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


    const updateEmail = e => {
        setFormState({
            ...formState,
            email: e.target.value
        })

        if (!validator.isEmail(e.target.value) && !validator.isEmpty(e.target.value)) {
            props.updateError({
                forgotPass: {
                    email: "Email is Invalid"
                }
            })

            return;
        }

        props.updateError({
            forgotPass: {
                email: ""
            }
        })
    }
    const updateOtp = e => {
        setFormState({
            ...formState,
            otp: e.target.value
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
                forgotPass: {
                    password: "Invalid Password"
                }
            })

            return;
        }

        props.updateError({
            forgotPass: {
                password: ""
            }
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


        if (validator.isEmpty(formState.email) || validator.isEmpty(formState.password)) {
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

    const resetPassword = e => {
        e.preventDefault();

        setFormState({
            ...formState,
            btnClicked: true
        })

        if (!isFormValid()) {
            return;
        }

        props.resetPassword(formState.email, formState.password, formState.otp)
    }


    if (props.fetchingState) {
        return (
            <Backdrop>
                <Spinner />
            </Backdrop>
        );
    }
    return (
        <form className="ForgotPass" onSubmit={resetPassword}>
            <div>
                <img src={userIcon} className="user-icon" alt="lock-icon" />
                <p className="heading">RESET PASSWORD</p>
            </div>

            <div className="details">
                <div className="input-box blue">

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

                <div className="input-box peach">

                    <div className="header">
                        <img src={lockIcon} alt="lock-icon" />
                        <p>New Password</p>

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

                <div className="input-box blue">

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
            <input type="submit" value="Reset Password" />
        </form>
    )
}

const mapStateToProps = state => {
    return {
        fetchingState: state.user.isFetching,
        errorState: state.user.error.forgotPass
    }
}

const mapActionsToProps = dispatch => {
    return {
        sendOtp: email => dispatch(sendResetPasswordOtp(email)),
        resetPassword: (email, password, otp) => dispatch(resetPassword(email, password, otp)),
        updateError: error => dispatch(updateErrorState(error))
    }
}

export default connect(mapStateToProps, mapActionsToProps)(ForgotPass);