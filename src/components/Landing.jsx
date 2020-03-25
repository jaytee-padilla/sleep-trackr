import React, { useContext } from 'react';

// Contexts
import { Auth0Context } from '../contexts/auth0-context';

const Landing = () => {
  // auth0 context
  const auth0 = useContext(Auth0Context);

  return (
    <div className='hero is-info is-fullheight'>
      <div className='hero-body'>
        <div className='container has-text-centered is-size-1'>
          {auth0.msg}
        </div>
      </div>
    </div>
  )
}

export default Landing
