import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import Register from '../authorize/Register/Register';
import Login from '../authorize/Login/Login';
import Profile from '../Main/Profile/Profile';
import Movies from '../Main/Movies/Movies';
import Footer from '../Footer/Footer';
import * as api from '../../utils/Api';
import movie from '../../utils/MovieApi';

function App () {
  const [moviesList, setMoviesList] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  // async function handleGetMovie() {
  //   try {
  //     const data = await movie.getMovieData();
  //     setMoviesList('load')
  //     const listMovie = JSON.stringify(data)
  //     localStorage.setItem('Movies', listMovie)
  //     console.log(moviesList)
  //   } catch(err) {
  //     console.log(err)
  //   }
    
  // }

  function handleGetMovie() {
    movie.getMovieData()
      .then(data => {
        setMoviesList(data)
        const movieData = JSON.stringify(data);
        localStorage.setItem('Movies', movieData)
        console.log("DATA", data, "MOVIELIST", moviesList)
      })
  }

  function handleLogin(email, password) {
    api.authorize(email, password)
      .then(data => {
        if (data) {
          localStorage.setItem('Authorized', 'true')
          setLoggedIn(true)
          console.log(currentUser)
          handleGetMovie()
          navigate('/movies', { replace: true })
        }
      })
      .catch(err => console.log(err))
  }

  function handleRegister(name, email, password) {
    api.register(name, email, password)
    .then(data => {
      console.log(data, "DATA")
      setCurrentUser({data})
      console.log(currentUser, "CURRENT USER")
    })
    .catch(err => console.log(err))
  }

  // function handleUpdateUser(userData) {
  //   api.updateUser(userData)
  //     .then(data => {
  //       setCurrentUser(data)
  //     })
  //     .catch(err => console.log(err))
  // }
  
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
          <Route path="/profile" element={<Profile currentUser={currentUser} />} />
          <Route path="/movies" element={<Movies moviesList={moviesList} getMovie={handleGetMovie} />} />
        </Routes>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
    
    
  )
}

export default App