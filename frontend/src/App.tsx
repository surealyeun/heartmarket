import React from 'react';
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
<<<<<<< HEAD
import test from './Components/Routers/test'
=======
import UpdateUser from './Components/Routers/UpdateUser';
import Sale from './Components/Routers/SaleMore';
import Purchase from './Components/Routers/PurchaseMore';
import UserProfile from './Components/Routers/UserProfile';
>>>>>>> 7d2d35815190b92c22551149aa0028842c2120c6

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
        <Route path="/user/:user" component={UserProfile} />

        <Route path="/" exact component={Main} ></Route>
        <Route path="/search" component={SearchResult}></Route>
        <Route path="/test" component={test}></Route>
        <Redirect path="*" to="/"></Redirect>
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
