import { useEffect, useState, useCallback } from 'react';
import { Routes, Route, useNavigate, NavLink } from 'react-router-dom';
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
import ErrorPopup from '../Main/Popup/ErrorPopup';
import * as MainApi from '../../utils/MainApi';
import Preloader from '../Main/Preloader/Preloader';
import { IMAGE_URL_BEAT_FILMS } from '../../utils/constants';



function App () {
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmiting, setIsSubmiting] = useState(true)
  const [errorPopup, setErrorPopup] = useState({ errorMessage: '', isSucces: false, isOpen: false });

  const navigate = useNavigate();

  const closePopup = () => {
    setErrorPopup({ ...errorPopup, isOpen: false })
  }

  const handleErrorMessage = useCallback((errorMessage, isSucces = false) => {
    setErrorPopup({ errorMessage, isOpen: true, isSucces })
  }, [])
  
  const handleSavedMovies = useCallback(async () => {
    try {
      const savedMovies = await MainApi.getSavedMovies();
      setSavedMoviesList(savedMovies)
    } catch(err) {
      handleErrorMessage(err)
    }
  }, [handleErrorMessage])

  async function addFavoritMovies(movie) {
    try {
      const favorit = await MainApi.addFavorit({
        ...movie,
        image: `${IMAGE_URL_BEAT_FILMS}${movie.image.url}`, 
        thumbnail: `${IMAGE_URL_BEAT_FILMS}${movie.image.formats.thumbnail.url}`, 
        movieId: movie.id
      })
      setSavedMoviesList([...savedMoviesList, favorit])
    } catch(err) {
      handleErrorMessage(err)
    }
  }

  async function deleteFavoritMovies(movieId) {
    try {
      await MainApi.deleteMovies(movieId);
      setSavedMoviesList(savedMoviesList.filter(movie => movie._id !== movieId))
    } catch(err) {
      handleErrorMessage(err)
    }
  }

  async function deleteBeatMovies(beatId) {
    try {
      const { _id } = savedMoviesList.find(movie => movie.movieId === beatId);
      await deleteFavoritMovies(_id);
    } catch(err) {
      handleErrorMessage(err)
    }
  }

  async function updateUser(name, email) {
    setIsSubmiting(true)
    try {
      const user = await MainApi.updateUser(name, email);
      if (user) {
        setCurrentUser(user)
        handleErrorMessage('Данные успешно обновлены', true)
      }
    } catch(err) {
      handleErrorMessage(err)
    } finally {
      setIsSubmiting(false)
    }
  }
 
  async function handleLogin(email, password) {
    setIsSubmiting(true)
    try {
      const { user } = await MainApi.authorize(email, password);
      await handleSavedMovies()
      localStorage.setItem('loggedIn', 'true');
      setLoggedIn(true);
      setCurrentUser(user);
      navigate ('/movies', { replace: true });
    } catch(err) {
      handleErrorMessage(err)
    } finally {
      setIsSubmiting(false)
    }
  }

  async function handleRegister(name, email, password) {
    setIsSubmiting(true)
    try {
      await MainApi.register(name, email, password);
      await handleLogin(email, password)
    } catch(err) {
      handleErrorMessage(err)
    } finally {
      setIsSubmiting(false)
    }
  }

  async function handleLogOut() {
    try {
      await MainApi.clearToken();
      setLoggedIn(false);
      localStorage.clear();
      navigate('/', { replace: true })
    } catch(err) {
      handleErrorMessage(err)
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
      handleErrorMessage(err)
    } finally {
      setIsLoading(false)
    }
  }, [handleErrorMessage])

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
          <Register onRegister={handleRegister} goLanding={goLanding} loggedIn={loggedIn} isSubmiting={isSubmiting} />
        }/>

        <Route path="/signin" element={
          <Login onLogin={handleLogin} goLanding={goLanding} loggedIn={loggedIn} isSubmiting={isSubmiting} />
        }/>

        <Route path="/profile" element={
          <ProtectedRoute 
            element={Profile} 
            loggedIn={loggedIn} 
            updateUser={updateUser} 
            onLogout={handleLogOut} 
            isSubmiting={isSubmiting}
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

      <ErrorPopup 
        onClose={closePopup} 
        error={errorPopup} 
      />

    </CurrentUserContext.Provider>
  )
}

export default App