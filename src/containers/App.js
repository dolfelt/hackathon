import React, { Component } from 'react';
import Router from 'react-router/BrowserRouter';
import Redirect from 'react-router/Redirect';
import Match from 'react-router/Match';
import Miss from 'react-router/Miss';

import {firebaseConnect, helpers} from 'react-redux-firebase';
import {connect} from 'react-redux';

import Layout from '../components/Layout';

import Login from './Login';
import IdeaList from './IdeaList';
import IdeaView from './IdeaView';

const {pathToJS, isLoaded} = helpers

const NoMatch = ({ location }) => (
  <div>
    <h3>No page found for <code>{location.pathname}</code></h3>
  </div>
)

class App extends Component {

  withAuth = Component => props => {
    if (!this.props.auth) {
      return <Redirect to="/login" />;
    }
    return (
      <Component { ...props } authData={ this.props.auth } />
    );
  };

  withoutAuth = Component => props => {
    if (this.props.auth) {
      return <Redirect to="/" />;
    }
    return (
      <Component { ...props } authData={ this.props.auth } />
    );
  };

  logout = () => {
    this.props.firebase.logout();
  }

  render() {
    const {auth} = this.props
    if (!isLoaded(auth)) {
      return (
        <div>LOADING...</div>
      );
    }

    return (
      <Router>
        <Layout loggedIn={!!this.props.auth} logout={this.logout}>
          <Match pattern="/" exactly component={ this.withAuth(IdeaList) } />
          <Match pattern="/idea/:id" exactly component={ this.withAuth(IdeaView) } />
          <Match pattern="/login" exactly component={ this.withoutAuth(Login) } />
          <Miss component={NoMatch} />
        </Layout>
      </Router>
    );
  }
}

export default connect(
  ({firebase}) => ({
    auth: pathToJS(firebase, 'auth'),
  })
)(firebaseConnect()(App));
