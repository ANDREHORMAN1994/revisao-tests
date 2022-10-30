import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Animal from './pages/Animal';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/animal" component={ Animal } />
    </Switch>
  );
}

export default App;
