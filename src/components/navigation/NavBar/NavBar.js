import './NavBar.css';

import { Link, NavLink } from 'react-router-dom'

import logo from '../../../assets/images/logo-transparent.png'
import { useEffect } from 'react';
import { useRef } from 'react';
import { logoutUser } from '../../../store/actions/user';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const NavBar = props => {

    const navBarRef = useRef();

    const onScroll = e => {
        if (window.scrollY > 200) {
            navBarRef.current.style.top = "-60px"
        }
        else {
            navBarRef.current.style.top = "0"
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [])

    const logout = () => {
        props.logoutUser(props.token);
        props.history.push('/')
    }


    return (
        <div className="NavBar" ref={navBarRef}>
            <Link to="/player/home" className="logo">
                <img src={logo} alt="logo" />
            </Link>
            {
                window.innerWidth > 550 ?
                    <div className="navigation-links">
                        <NavLink to="/player/home" activeClassName="active-navigation-link"> HOME </NavLink>
                        <NavLink to="/player/browse" activeClassName="active-navigation-link"> BROWSE </NavLink>
                        <NavLink to="/player/library" activeClassName="active-navigation-link"> LIBRARY </NavLink>
                    </div> : null
            }

            <input className="logout-btn" value="LOGOUT" type="button" onClick={logout} />

        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.user.token
    }
}

const mapActionToProps = dispatch => {
    return {
        logoutUser: token => dispatch(logoutUser(token))
    }
}

export default connect(mapStateToProps, mapActionToProps)(withRouter(NavBar));