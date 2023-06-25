import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import movies from '../../../utils/MoviesApi';
import { useCastomForm, useFormWithValidation } from "../../../utils/hook/useForm";
import { useState } from "react";

import './Movies.css';

function Movies({ isLoading, addFavoritMovies }) {

  const [moviesList, setMoviesList] = useState([]);
  const [filtredMoviesList, setFiltredMoviesList] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const { values, handleChange, setValues } = useCastomForm();


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
  
  const renderMovies = () => {
    const keyword = getSearch()
    const filtredMovies = moviesList.filter(movie => movie.nameRU.includes(keyword) || movie.nameEN.includes(keyword)) 
    setFiltredMoviesList(filtredMovies)
  }
  
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    saveSearch()
    await getMovies()
    renderMovies()
  }

  return (
    <main className="movies">
      <SearchForm inputValues={values} onChange={handleChange} onSubmit={handleSubmit}/>
      <MoviesCardList moviesList={filtredMoviesList} isLoading={isLoading} addFavoritMovies={addFavoritMovies} />
      <button className="movies__button" type="button">Ещё</button>
    </main>
  )
}

export default Movies;