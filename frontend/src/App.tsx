import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './Components/Routers/Login';
import Join from './Components/Routers/Join';
import Mypage from './Components/Routers/Mypage';
import JoinDetail from './Components/Routers/JoinDetail';
import JoinSuccess from './Components/Routers/JoinSuccess'; 

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route path="/login" component={Login} />
        <Route path="/join" component={Join} exact/>
        <Route path="/mypage" component={Mypage} />
        <Route path="/join/detail" component={JoinDetail} />
        <Route path="/joinsuc" component={JoinSuccess} />
      </BrowserRouter>
    </div>
  );
}

export default App;
