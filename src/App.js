import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// components
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Landing} />
          {/* My or may not need these Login & Register components based on how Auth0 works
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
