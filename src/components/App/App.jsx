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
import Preloader from '../Main/Preloader/Preloader';
import { imageURLBeatFilms } from '../../utils/constants';

function App () {
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  
  const handleSavedMovies = useCallback(async () => {
    try {
      const savedMovies = await MainApi.getSavedMovies();
      setSavedMoviesList(savedMovies)
    } catch(err) {
      console.log(err)
    }
  }, [])

  const addFavoritMovies = async (movie) => {
    try {
      const favorit = await MainApi.addFavorit({
        ...movie,
        image: `${imageURLBeatFilms}${movie.image.url}`, 
        thumbnail: `${imageURLBeatFilms}${movie.image.formats.thumbnail.url}`, 
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

  const deleteBeatMovies = async (beatId) => {
    try {
      const { _id } = savedMoviesList.find(movie => movie.movieId === beatId);
      await deleteFavoritMovies(_id);
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
      await handleSavedMovies()
      localStorage.setItem('loggedIn', 'true');
      setLoggedIn(true);
      setCurrentUser(user);
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

  const handleLogOut = async () => {
    try {
      await MainApi.clearToken();
      setLoggedIn(false);
      localStorage.clear();
      navigate('/', { replace: true })
    } catch(err) {
      console.log(err)
    }
  }
  
  const goLanding = () => {
    navigate('/', { replace: true })
  };

  const handleTokenCheck = useCallback( async () => {
    const loggedIn = localStorage.getItem('loggedIn')
    try {
      if (loggedIn) {
        const user = await MainApi.checkToken();
        setCurrentUser(user)
        setLoggedIn(true)
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

  useEffect(() => {
    loggedIn && handleSavedMovies()
  }, [loggedIn, handleSavedMovies])

  if (isLoading) {
    return <Preloader />
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header loggedIn={loggedIn} goLanding={goLanding}/>
      <Routes>

        <Route path="/" element={
          <Landing />
        }/>

        <Route path="/signup" element={
          <Register onRegister={handleRegister} goLanding={goLanding} />
        }/>

        <Route path="/signin" element={
          <Login onLogin={handleLogin} goLanding={goLanding} />
        }/>

        <Route path="/profile" element={
          <ProtectedRoute 
            element={Profile} 
            loggedIn={loggedIn} 
            currentUser={currentUser} 
            updateUser={updateUser} 
            onLogout={handleLogOut} 
           />} 
        />

        <Route path="/movies" element={
          <ProtectedRoute 
            element={Movies} 
            addFavoritMovies={addFavoritMovies}
            deleteBeatMovies={deleteBeatMovies} 
            loggedIn={loggedIn} 
            isLoading={isLoading}
            savedMoviesList={savedMoviesList}
          />} 
        />

        <Route path="/saved-movies" element={
          <ProtectedRoute 
            element={SavedMovies} 
            deleteFavoritMovies={deleteFavoritMovies} 
            loggedIn={loggedIn} 
            savedMoviesList={savedMoviesList} 
          />} 
        />

        <Route path="*" element={<NotFound />} />

      </Routes>
      <Footer />
    </CurrentUserContext.Provider>
  )
}

export default App