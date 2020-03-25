import React, { createContext, useState } from 'react'

// create the context
export const Auth0Context = createContext();

// create a provider
export const Auth0Provider = props => {
  // creating the test message in state
  const [state, setState] = useState({
    msg: 'test message'
  })

  const { children } = props;

  const configObject = state;

  return (
    <div>
      <Auth0Context.Provider value={configObject}>
        {children}
      </Auth0Context.Provider>
    </div>
  )
}
