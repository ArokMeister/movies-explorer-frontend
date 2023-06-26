import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useCastomForm, useFormWithValidation } from "../../../utils/hook/useForm";
import { useState, useEffect, useCallback } from "react";

function SavedMovies({ savedMoviesList, deleteFavoritMovies }) {
  
  const [savedSortMovies, setSavedSortMovies] = useState(savedMoviesList)

  const [isShortSavedMovies, setIsShortSavedMovies] = useState([]);

  // const [shortMovie, setShortMovie] = useState(false);

  const [isCheckboxMoviesActive, setIsCheckboxMoviesActive] = useState(false);

  const { values, handleChange, setValues } = useCastomForm();

  const saveSearch = () => {
    localStorage.setItem('SaveSearch', values.search)
  }

  const getSearch = () => {
    return localStorage.getItem('SaveSearch')
  }

  const handleCheckbox = () => {
    const updateState = !isCheckboxMoviesActive;
    setIsCheckboxMoviesActive(updateState)
  }

  const renderMovies = useCallback(() => {
    const keyword = getSearch();
    const filtredMovies = savedMoviesList.filter(movie => movie.nameRU.includes(keyword) || movie.nameEN.includes(keyword)) 
    setSavedSortMovies(filtredMovies)
    if (isCheckboxMoviesActive) {
      const filtredShortMovies = filtredMovies.filter(movie => movie.duration <= 40)
      setSavedSortMovies(filtredShortMovies)
    }
  }, [isCheckboxMoviesActive, savedMoviesList])
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    saveSearch()
    renderMovies()
  }

  // const renderMovies = useCallback(() => {
  //   const keyword = getSearch()
  //   const filtredMovies = moviesList.filter(movie => movie.nameRU.includes(keyword) || movie.nameEN.includes(keyword))
  //   setFiltredMoviesList(filtredMovies)
  //   if (shortMovie) {
  //     const filtredShortMovies = moviesList.filter(movie => movie.duration <= 40)
  //     setFiltredMoviesList(filtredShortMovies)
  //   }
  // }, [moviesList, shortMovie])
  
  // const handleSubmit = async (evt) => {
  //   evt.preventDefault();
  //   saveSearch()
  //   await getMovies()
  //   renderMovies()
  // }

  useEffect(() => {
    renderMovies()
  }, [renderMovies, isCheckboxMoviesActive])

  return (
    <main className="saved-movies">
      <SearchForm inputValues={values} onChange={handleChange} onSubmit={handleSubmit} onShort={handleCheckbox} />
      <MoviesCardList moviesList={savedSortMovies} deleteFavoritMovies={deleteFavoritMovies}/>
    </main>
  )
}

export default SavedMovies;