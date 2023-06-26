import { useEffect, useState, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../Main/ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import Register from '../authorize/Register/Register';
import Login from '../authorize/Login/Login';
import Profile from '../Main/Profile/Profile';
import Movies from '../Main/Movies/Movies';
import SavedMovies from '../Main/SavedMovies/SavedMovies';
import NotFound from '../Main/NotFound/NotFound';
import Footer from '../Footer/Footer';
import * as MainApi from '../../utils/MainApi';
import movies from '../../utils/MoviesApi';
import Preloader from '../Main/Preloader/Preloader';

function App () {
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  // const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")) || {});
  // const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn") === "true" || false);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  console.log(currentUser, 'App')
  const handleSavedMovies = async () => {
    try {
      const savedMovies = await MainApi.getSavedMovies();
      setSavedMoviesList(savedMovies)
      console.log(savedMoviesList)
    } catch(err) {
      console.log(err)
    }
  }

  const addFavoritMovies = async (movie) => {
    try {
      const favorit = await MainApi.addFavorit({
        ...movie,
        image: `https://api.nomoreparties.co${movie.image.url}`, 
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`, 
        movieId: movie.id
      })
      setSavedMoviesList([...savedMoviesList, favorit])
    } catch(err) {
      console.log(err)
    }
  }

  const deleteFavoritMovies = async (movieId) => {
    try {
      await MainApi.deleteMovies(movieId);
      setSavedMoviesList(savedMoviesList.filter(movie => movie._id !== movieId))
    } catch(err) {
      console.log(err)
    }
  }

  async function updateUser(name, email) {
    try {
      const { user } = await MainApi.updateUser(name, email);
      if (user) {
        console.log(user, "updateUser")
        setCurrentUser(user)
      }
    } catch(err) {
      console.log(err)
    }
  }
 
  async function handleLogin(email, password) {

    try {
      const { user } = await MainApi.authorize(email, password);
      localStorage.setItem('loggedIn', 'true');
      // localStorage.setItem("currentUser", JSON.stringify(user))
      setLoggedIn(true);
      setCurrentUser(user);
      handleSavedMovies()
      navigate ('/movies', { replace: true });
    } catch(err) {
      console.log(err)
    }
  }

  async function handleRegister(name, email, password) {
    try {
      await MainApi.register(name, email, password);
      await handleLogin(email, password)
    } catch(err) {
      console.log(err)
    }
  }

  function handleLogOut() {
    MainApi.clearToken()
      .then(() => {
        setLoggedIn(false)
        localStorage.clear()
        navigate('/', { replace: true })
      })
      .catch(err => console.log(err))
  }
  
  const goLanding = () => {
    navigate('/', { replace: true })
  };

  const handleTokenCheck = useCallback( async () => {
    const loggedIn = localStorage.getItem('loggedIn')
    try {
      if (loggedIn) {
        const user = await MainApi.checkToken();
        await handleSavedMovies();
        setLoggedIn(true)
        setCurrentUser(user)
      }
    } catch(err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    handleTokenCheck()
  }, [handleTokenCheck])

  if (isLoading) {
    return <Preloader />
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header loggedIn={loggedIn} goLanding={goLanding}/>
      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/signup" element={<Register onRegister={handleRegister} goLanding={goLanding} />} />

        <Route path="/signin" element={<Login onLogin={handleLogin} goLanding={goLanding}/>} />

        <Route path="/profile" element={<ProtectedRoute element={Profile} loggedIn={loggedIn} currentUser={currentUser} updateUser={updateUser} onLogout={handleLogOut} setCurrentUser={setCurrentUser} />} />

        <Route path="/movies" element={<ProtectedRoute element={Movies} addFavoritMovies={addFavoritMovies} loggedIn={loggedIn} isLoading={isLoading}  />} />

        <Route path="/saved-movies" element={<ProtectedRoute element={SavedMovies} deleteFavoritMovies={deleteFavoritMovies} loggedIn={loggedIn} savedMoviesList={savedMoviesList} />} />

        <Route path="*" element={<NotFound />} />

      </Routes>
      <Footer />
    </CurrentUserContext.Provider>
    
    
  )
}

export default App