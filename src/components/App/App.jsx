// import { useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Main from '../Main/Main';

function App () {
  // const [currentUser, setCurrentUser] = useState({name: 'user'})

  
  return (
    <div className='App'>
      <CurrentUserContext.Provider>
        <Header/>
        <Main />
      </CurrentUserContext.Provider>
    </div>
    
    
  )
}

export default App