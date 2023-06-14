// import { useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function App () {
  // const [currentUser, setCurrentUser] = useState({name: 'user'})

  
  return (
    <div className='App'>
      <CurrentUserContext.Provider>
        <Header/>
        <Main />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
    
    
  )
}

export default App