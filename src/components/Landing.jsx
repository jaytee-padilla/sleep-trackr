import React, { useContext } from 'react';

// Contexts
import { Auth0Context } from '../contexts/auth0-context';

const Landing = () => {
  // auth0 context
  const auth0 = useContext(Auth0Context);

  return (
    <div className='hero is-info is-fullheight'>
      <div className='hero-body'>
        <div className='container has-text-centered'>
          <h1 className='is-size-1'>Click Below!</h1>
          <button onClick={auth0.loginWithRedirect} className='button is-danger'>
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Landing
