import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useCastomForm } from "../../../utils/hook/useForm";
import { useState, useEffect, useCallback } from "react";

import "./SavedMovies.css"

function SavedMovies({ savedMoviesList, deleteFavoritMovies }) {

  const [savedSortMovies, setSavedSortMovies] = useState(savedMoviesList)
  const [isCheckboxMoviesActive, setIsCheckboxMoviesActive] = useState(false);

  const { values, handleChange } = useCastomForm();

  const saveSearch = () => {
    localStorage.setItem('SaveSearch', values.search)
  }

  const getSearch = () => {
    return localStorage.getItem('SaveSearch')
  }

  const handleCheckbox = () => {
    const updateState = !isCheckboxMoviesActive;
    setIsCheckboxMoviesActive(updateState)
    localStorage.setItem('SavedMoviesCheckbox', updateState)
  }

  const renderMovies = useCallback(() => {
    const keyword = getSearch();
    let filtredMovies = savedMoviesList.filter(movie => movie.nameRU.includes(keyword) || movie.nameEN.includes(keyword)) 
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

  useEffect(() => {
    const savedMoviesFromStorage = localStorage.getItem('savedMoviesList');
    if (savedMoviesFromStorage && !savedMoviesList.length) {
      setSavedSortMovies(JSON.parse(savedMoviesFromStorage));
    }

    renderMovies();

    // renderMovies()
  }, [renderMovies, isCheckboxMoviesActive, savedMoviesList])
  
  
  useEffect(() => {
    setSavedSortMovies(savedMoviesList)
  }, [])

  return (
    <main className="saved-movies">
      <SearchForm inputValues={values} onChange={handleChange} onSubmit={handleSubmit} onShort={handleCheckbox} checked={isCheckboxMoviesActive} />
      <MoviesCardList moviesList={savedSortMovies} deleteFavoritMovies={deleteFavoritMovies}/>
    </main>
  )
}

export default SavedMovies;