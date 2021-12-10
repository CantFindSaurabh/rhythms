import './App.css';

import { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import Authentication from './containers/Authentication/Authentication';
import Player from './containers/Player/Player';

import { fetchUserProfile } from './store/actions/user';


function App(props) {

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken != null) {
      props.fetchUserProfile(jwtToken);
    }

  }, [])


  return (
    <div className="App">
      <Switch>
        {
          props.isAuthenticated ?
            (
              <Fragment>
                <Route path='/player' component={Player} />
                <Redirect to='/player' />
              </Fragment>
            ) :
            (
              <Fragment>
                <Route path='/authenticate' component={Authentication} />
                <Redirect to='/authenticate' />
              </Fragment>
            )
        }
      </Switch>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.isAuthenticated
  }
}

const mapActionsToProps = dispatch => {
  return {
    fetchUserProfile: (token) => dispatch(fetchUserProfile(token))
  }
}

export default connect(mapStateToProps, mapActionsToProps)(App);
