import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import movies from '../../../utils/MoviesApi';
import { useCastomForm, useFormWithValidation } from "../../../utils/hook/useForm";
import { useEffect, useState, useCallback } from "react";

import './Movies.css';

function Movies({ isLoading, addFavoritMovies }) {

  const [moviesList, setMoviesList] = useState([]);
  const [filtredMoviesList, setFiltredMoviesList] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [shortMovie, setShortMovie] = useState(false);
  const { values, handleChange, setValues } = useCastomForm();


  const filtredShortMovies = () => {
    setShortMovie(!shortMovie)
    localStorage.setItem('ShortMovie', !shortMovie)
  }

  const saveSearch = () => {
    localStorage.setItem('Search', values.search)
  }

  const getSearch = () => {
    return localStorage.getItem('Search')
  }

  const getMovies = async () => {
    try {
      if (localStorage.getItem('Movies')) {
        const parsDataLS = JSON.parse(localStorage.getItem('Movies'))
        setMoviesList(parsDataLS)
      } else {
        const moviesList = await movies.getMoviesData();
        localStorage.setItem('Movies', JSON.stringify(moviesList));
        setMoviesList(moviesList)
      }
    } catch(err) {
      console.log(err)
    }
  }
  
  const renderMovies = useCallback(() => {
    const keyword = getSearch()
    const filtredMovies = moviesList.filter(movie => movie.nameRU.includes(keyword) || movie.nameEN.includes(keyword))
    setFiltredMoviesList(filtredMovies)
    if (shortMovie) {
      const filtredShortMovies = moviesList.filter(movie => movie.duration <= 40)
      setFiltredMoviesList(filtredShortMovies)
    }
  }, [moviesList, shortMovie])
  
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    saveSearch()
    await getMovies()
    renderMovies()
  }

  useEffect(() => {
    renderMovies()
  }, [renderMovies, shortMovie])


  return (
    <main className="movies">
      <SearchForm inputValues={values} onChange={handleChange} onSubmit={handleSubmit} onShort={filtredShortMovies}/>
      <MoviesCardList moviesList={filtredMoviesList} isLoading={isLoading} addFavoritMovies={addFavoritMovies} />
      <button className="movies__button" type="button">Ещё</button>
    </main>
  )
}

export default Movies;