import React from 'react';
import Header from './Components/Common/Header'
import Main from './Components/Main/Main'
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} >
          <Header></Header>
        </Route>
        <Redirect path="*" to="/"></Redirect>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
