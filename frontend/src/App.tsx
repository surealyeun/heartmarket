import React from 'react';

import Main from './components/routers/Main'
import Write from './components/routers/Write'
import Alarm from './components/routers/Alarm'
import DetailAlarm from './components/routers/DetailAlarm'
import WriteUpdate from './components/routers/WriteUpdate'

import SearchResult from "./components/routers/SearchResult"
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';


import Login from './components/routers/Login';
import Join from './components/routers/Join';
import Mypage from './components/routers/Mypage';
import JoinDetail from './components/routers/JoinDetail';
import JoinSuccess from './components/routers/JoinSuccess'; 
import UpdateUser from './components/routers/UpdateUser';
import Sale from './components/routers/SaleMore';
import Purchase from './components/routers/PurchaseMore';
import Like from './components/routers/LikeMore';
import UserProfile from './components/routers/UserProfile';
import UserProfileTest from './components/routers/UserProfileTest';
import Detail from './components/routers/Detail';
import Map from './components/routers/Map';

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
        <Route path="/like" component={Like} />
        <Route path="/user/:userNo" component={UserProfileTest} />
        <Route path="/search/detail/:tradeNo" component={Detail} />

        <Route path="/" exact component={Main} ></Route>
        <Route path="/alarm" exact component={Alarm}></Route>
        <Route path="/write" exact component={Write} />
        <Route path="/alarm/detail" component={DetailAlarm} />
        <Route path="/write/update" component={WriteUpdate} />

        <Route path="/search" exact component={SearchResult}></Route>
        <Route path="/map" component={Map} />
        <Redirect path="*" to="/"></Redirect>
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
