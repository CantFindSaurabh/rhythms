import './Authentication.css';

import { Route, Switch } from 'react-router';

import logo from '../../assets/images/logo-transparent.png'
import background from '../../assets/images/bg-1.jpg'

import Welcome from '../../components/auth/Welcome/Welcome';
import Login from '../../components/auth/Login/Login';
import Signup from '../../components/auth/Signup/Signup';
import ForgotPass from '../../components/auth/ForgotPass/ForgotPass';

const Authentication = () => {
    return (
        <div className="Authentication">

            <img src={logo} className="logo" alt="logo" />
            <img src={background} className="background" alt="background" />

            <Switch>
                <Route path='/authenticate' exact component={Welcome} />
                <Route path='/authenticate/login' exact component={Login} />
                <Route path='/authenticate/signup' exact component={Signup} />
                <Route path='/authenticate/forgot-pass' exact component={ForgotPass} />
            </Switch> 

        </div>
    )
}

export default Authentication;