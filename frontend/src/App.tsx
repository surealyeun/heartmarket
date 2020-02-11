import React from 'react';
// import Header from './Components/Common/Header'
// import Nav from './Components/Common/Nav'
// import Button from './Components/Common/Button'
// import Footer from './Components/Common/Footer'
import Main from './Components/routers/Main'
import Write from './Components/routers/Write'
import Alarm from './Components/routers/Alarm'
import DetailAlarm from './Components/routers/DetailAlarm'

import SearchResult from "./Components/routers/SearchResult"
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';


import Login from './Components/routers/Login';
import Join from './Components/routers/Join';
import Mypage from './Components/routers/Mypage';
import JoinDetail from './Components/routers/JoinDetail';
import JoinSuccess from './Components/routers/JoinSuccess'; 
import UpdateUser from './Components/routers/UpdateUser';
import Sale from './Components/routers/SaleMore';
import Purchase from './Components/routers/PurchaseMore';
import UserProfile from './Components/routers/UserProfile';
import Detail from './Components/routers/Detail';

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
        <Route path="/search/detail/:tradeNos" component={Detail} />

        <Route path="/" exact component={Main} ></Route>
        <Route path="/alarm" exact component={Alarm}></Route>
        <Route path="/write" component={Write} />
        <Route path="/alarm/detail" component={DetailAlarm} />

        <Route path="/search" exact component={SearchResult}></Route>
        <Redirect path="*" to="/"></Redirect>
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
