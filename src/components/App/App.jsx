import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import Register from '../authorize/Register/Register';
import Login from '../authorize/Login/Login';
import Profile from '../Main/Profile/Profile';
import Movies from '../Main/Movies/Movies';
import SavedMovies from '../Main/SavedMovies/SavedMovies';
import NotFound from '../Main/NotFound/NotFound';
import Footer from '../Footer/Footer';
import * as api from '../../utils/Api';
import movie from '../../utils/MovieApi';

function App () {
  const [moviesList, setMoviesList] = useState([]);
  const [currentUser, setCurrentUser] = useState({name: 'Denis', email: 'test@test.ru'});
  const [loggedIn, setLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loggedIn &&
      movie.getMovieData()
      .then(data => {
        setMoviesList(data)
        const movieData = JSON.stringify(data);
        localStorage.setItem('Movies', movieData)
      })
  }, [loggedIn])

  // function handleGetMovie() {
  //   movie.getMovieData()
  //     .then(data => {
  //       setMoviesList(data)
  //       const movieData = JSON.stringify(data);
  //       localStorage.setItem('Movies', movieData)
  //     })
  // }

  function render12Movie() {
    const movieData = localStorage.getItem('Movies');
    if (movieData) {
      const parsedData = JSON.parse(movieData);
      const first12Rows = parsedData.slice(0, 12);
      setIsLoading(false);
      return first12Rows;
    }
  }

  function render5Movie() {
    const movieData = localStorage.getItem('Movies');
    if (movieData) {
      const parsedData = JSON.parse(movieData);
      const first5Rows = parsedData.slice(0, 5);
      setTimeout(() => {setIsLoading(false)}, 7000)
      return first5Rows;
    }
  }
  

  function handleLogin(email, password) {
    api.authorize(email, password)
      .then(data => {
        if (data) {
          localStorage.setItem('Authorized', 'true')
          setLoggedIn(true)
          // handleGetMovie()
          navigate('/movies', { replace: true })
        }
      })
      .catch(err => console.log(err))
  }

  function handleRegister(name, email, password) {
    api.register(name, email, password)
      .then(data => {
      // setCurrentUser({data})
        navigate('/signin', { replace: true })
    })
    .catch(err => console.log(err))
  }

  function handleLogOut() {
    // api.clearToken()
    //   .then(() => {
        setLoggedIn(false)
        localStorage.removeItem('Authorized')
        navigate('/', { replace: true })
      // })
      // .catch(err => console.log(err))
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
          <Route path="/profile" element={<Profile currentUser={currentUser} onLogout={handleLogOut} />} />
          <Route path="/movies" element={<Movies isLoading={isLoading} render={render12Movie} moviesList={moviesList}  />} />
          <Route path="/saved-movies" element={<SavedMovies render={render5Movie} moviesList={moviesList}  />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
    
    
  )
}

export default App