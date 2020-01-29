import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './Components/Routers/Login';
import Join from './Components/Routers/Join';
import Mypage from './Components/Routers/Mypage';
import JoinDetail from './Components/Routers/JoinDetail';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route path="/login" component={Login} />
        <Route path="/join" component={Join} />
        <Route path="/mypage" component={Mypage} />
        <Route path="/join2" component={JoinDetail} />
      </BrowserRouter>
    </div>
  );
}

export default App;
