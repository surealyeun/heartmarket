import React from 'react';
// import Header from './Components/Common/Header'
// import Nav from './Components/Common/Nav'
// import Button from './Components/Common/Button'
// import Footer from './Components/Common/Footer'
import Main from './Components/Routers/Main'
import SearchResult from "./Components/Routers/SearchResult"
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} ></Route>
        <Route path="/search" component={SearchResult}></Route>
        <Redirect path="*" to="/"></Redirect>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
