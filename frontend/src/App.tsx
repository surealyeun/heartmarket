import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './Components/Routers/Login';
import Join from './Components/Routers/Join';
import Mypage from './Components/Routers/Mypage';

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Route path="/login" component={Login} />
        <Route path="/join" component={Join} />
        <Route path="/mypage" component={Mypage} />
      </BrowserRouter>
    </div>
  );
}

export default App;
