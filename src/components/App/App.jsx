import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import Register from '../authorize/Register/Register';
import Login from '../authorize/Login/Login';
import Profile from '../Main/Profile/Profile';
import Footer from '../Footer/Footer';
import * as api from '../../utils/Api';

function App () {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(true);

  const navigate = useNavigate();

  function handleLogin(email, password) {
    api.authorize(email, password)
      .then(data => {
        if (data) {
          localStorage.setItem('Authorized', 'true')
          setLoggedIn(true)
          setCurrentUser(data)
          // navigate('/', { replace: true })
        }
      })
      .catch(err => console.log(err))
  }

  function handleRegister(name, email, password) {
    api.register(name, email, password)
    .then(data => {
      setCurrentUser(data)
    })
    .catch(err => console.log(err))
  }

  function handleUpdateUser(userData) {
    api.updateUser(userData)
      .then(data => {
        setCurrentUser(data)
      })
      .catch(err => console.log(err))
  }
  

  const goLanding = () => {
    navigate('/', { replace: true })
  };
  
  return (
    <div className='App'>
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn}/>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Register onRegister={handleRegister} goLanding={goLanding} />} />
          <Route path="/signin" element={<Login onLogin={handleLogin} goLanding={goLanding}/>} />
          <Route path="/profile" element={<Profile onUpdate={handleUpdateUser} />} />
        </Routes>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
    
    
  )
}

export default App