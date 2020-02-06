import React from 'react';
<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
=======
// import Header from './Components/Common/Header'
// import Nav from './Components/Common/Nav'
// import Button from './Components/Common/Button'
// import Footer from './Components/Common/Footer'
import Main from './Components/Routers/Main'
import SearchResult from "./Components/Routers/SearchResult"
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';


import Login from './Components/Routers/Login';
import Join from './Components/Routers/Join';
import Mypage from './Components/Routers/Mypage';
import JoinDetail from './Components/Routers/JoinDetail';
import JoinSuccess from './Components/Routers/JoinSuccess'; 
import UpdateUser from './Components/Routers/UpdateUser';
import Sale from './Components/Routers/SaleMore';
import Purchase from './Components/Routers/PurchaseMore';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/join" component={Join} exact/>
        <Route path="/mypage" component={Mypage} exact/>
        <Route path="/join/detail" component={JoinDetail} />
        <Route path="/joinsuc" component={JoinSuccess} />
        <Route path="/mypage/update" component={UpdateUser}/>
        <Route path="/sale" component={Sale}/>
        <Route path="/purchase" component={Purchase} />

        <Route path="/" exact component={Main} ></Route>
        <Route path="/search" component={SearchResult}></Route>
        <Redirect path="*" to="/"></Redirect>
      </Switch>
    </BrowserRouter>
>>>>>>> 575187abc5afbfd9c4aa0db7eb7915541abf80e9
    </div>
  );
}

export default App;
