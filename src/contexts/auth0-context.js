import React, { Component, createContext } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';

// create the context for auth0
export const Auth0Context = createContext();

// create the provider for auth0
export class Auth0Provider extends Component {
  // holds data that's used to track the processes of authenticating a user
  state = {
    auth0Client: null,
    isLoading: true,
    isAuthenticated: false,
    user: null
  };

  // grabs the relevant data from .env
  config = {
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
    redirect_uri: window.location.origin
  };

  // when this components is mounted, stars the auth0 authentication process
  componentDidMount() {
    this.initializeAuth0();
  }

  // initialize the auth0 library
  initializeAuth0 = async () => {
    const auth0Client = await createAuth0Client(this.config);
    const isAuthenticated = await auth0Client.isAuthenticated();
    const user = isAuthenticated ? await auth0Client.getUser(): null;

    this.setState({auth0Client, isLoading: false, isAuthenticated, user});
  };


  render() {
    // destructuring
    const {auth0Client, isLoading, isAuthenticated, user} = this.state;
    const {children} = this.props;

    // contains info about current user's status of authentication
    const configObject = {
      isLoading,
      isAuthenticated,
      user,
      loginWithRedirect: (...params) => auth0Client.loginWithRedirect(...params),
      getTokenSilently: (...params) => auth0Client.getTokenSilently(...params),
      getIdTokenClaims: (...params) => auth0Client.getIdTokenClaims(...params),
      logout: (...params) => auth0Client.logout(...params)
    };

    return (
      <Auth0Context.Provider value={configObject}>
        {children}
      </Auth0Context.Provider>
    );
  }
}
