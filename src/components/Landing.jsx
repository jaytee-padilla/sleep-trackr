import React, { useContext } from 'react';

// Contexts
import { Auth0Context } from '../contexts/auth0-context';

const Landing = () => {
  // auth0 context
  const {isAuthenticated, user, loginWithRedirect, logout} = useContext(Auth0Context);

  return (
    <div className='hero is-info is-fullheight'>
      <div className='hero-body'>
        <div className='container has-text-centered'>
          {!isAuthenticated && !user && (
            <>
              <h1>Click Below!</h1>
              <button onClick={loginWithRedirect} className='button is-danger'>
                Login
              </button>
            </>
          )}

          {isAuthenticated && user && (
            <>
              <h1>You are logged in!</h1>
              <p>Hello {user.name}</p>

              {user.picture && <img src={user.picture} alt='My Avatar' />}
              <hr />

              <button
                onClick={() => logout({ returnTo: window.location.origin })}
                className="button is-small is-dark"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Landing
