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

  // when this components is mounted, starts the auth0 authentication process
  componentDidMount() {
    this.initializeAuth0();
  }

  // This function is triggered if the user has correctly logged in
  handleRedirectCallback = async () => {
    this.setState({isLoading: true});

    await this.state.auth0Client.handleRedirectCallback();
    const user = await this.state.auth0Client.getUser();

    this.setState({user, isAuthenticated: true, isLoading: false});

    // Updates the URL to remove the 'code='. This code can only be used once, so it needs to be removed from the URL to prevent handleRedirectCallback() from running again in the case that the user refreshes the page
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  // Checks for 'code=' in the URL. If that does exist, then go straight to the handleRedirectCallback() method. This will call Auth0's handleRedirectCallback() method and then grab the user's information. We will setState() and React will pass all this information down to the application
  initializeAuth0 = async () => {
    const auth0Client = await createAuth0Client(this.config);
    this.setState({auth0Client});

    // check to see if they have been redirected after login
    if(window.location.search.includes('code=')) {
      return this.handleRedirectCallback();
    }

    const isAuthenticated = await auth0Client.isAuthenticated();
    const user = isAuthenticated ? await auth0Client.getUser() : null;
    this.setState({isLoading: false, isAuthenticated, user});
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
