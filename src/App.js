import React from 'react';

import { Fragment, Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import Backdrop from './components/ui/Backdrop/Backdrop';
import Spinner from './components/ui/Spinner/Spinner';

import { fetchUserProfile } from './store/actions/user';

const Player = React.lazy(() => import('./containers/Player/Player'));
const Authentication = React.lazy(() => import('./containers/Authentication/Authentication'));

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
        <Suspense fallback={<Backdrop> <Spinner /> </Backdrop>}>
          {
            props.isAuthenticated ?
              (
                <Fragment>
                  <Route path='/player' render={(props) => <Player {...props} />} />
                  <Redirect to='/player' />
                </Fragment>
              ) :
              (
                <Fragment>
                  <Route path='/authenticate' render={(props) => <Authentication {...props} />} />
                  <Redirect to='/authenticate' />
                </Fragment>
              )
          }
        </Suspense>
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
