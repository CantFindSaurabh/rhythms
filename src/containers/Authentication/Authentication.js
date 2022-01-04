import './Authentication.css';

import React from 'react';

import { Route, Switch } from 'react-router';
import { Suspense } from 'react';

import Backdrop from '../../components/ui/Backdrop/Backdrop';
import Spinner from '../../components/ui/Spinner/Spinner';

import Welcome from '../../components/auth/Welcome/Welcome';

import logo from '../../assets/images/logo-transparent.png'
import background from '../../assets/images/bg-1.jpg'

const Login = React.lazy(() => import('../../components/auth/Login/Login'));
const Signup = React.lazy(() => import('../../components/auth/Signup/Signup'));
const ForgotPass = React.lazy(() => import('../../components/auth/ForgotPass/ForgotPass'))

const Authentication = () => {
    return (
        <div className="Authentication">

            <img src={logo} className="logo" alt="logo" />
            <img src={background} className="background" alt="background" />

            <Switch>
                <Suspense fallback={<Backdrop> <Spinner /> </Backdrop>}>
                    <Route path='/authenticate' exact component={Welcome} />
                    <Route path='/authenticate/login' exact render={(props) => <Login {...props} />} />
                    <Route path='/authenticate/signup' exact render={(props) => <Signup {...props} />} />
                    <Route path='/authenticate/forgot-pass' exact render={(props) => <ForgotPass {...props} />} />
                </Suspense>
            </Switch>

        </div>
    )
}

export default Authentication;