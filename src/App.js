import {React, useState} from 'react';

import SignInPage from './components/SignInPage';
import Header from './components/Header';
import Todos from './components/Todos';

function App() {
  const [currentUser, setCurrentUser] = useState(1)
  return (
    <div className="App">
      <Header currentUser = {currentUser} setCurrentUser = {setCurrentUser}/>
      {currentUser ? <Todos/> : <SignInPage setCurrentUser = {setCurrentUser}/>}
    </div>
  );
}

export default App;
