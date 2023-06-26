import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import movies from '../../../utils/MoviesApi';
import { useCastomForm, useFormWithValidation } from "../../../utils/hook/useForm";
import { useEffect, useState, useCallback } from "react";

import './Movies.css';

function Movies({ isLoading, addFavoritMovies }) {

  const [moviesList, setMoviesList] = useState([]);
  const [filtredMoviesList, setFiltredMoviesList] = useState([]);

  const [isCheckboxMoviesActive, setIsCheckboxMoviesActive] = useState(false);

  const { values, handleChange, setValues } = useCastomForm();

  const handleCheckbox = () => {
    const updateState = !isCheckboxMoviesActive;
    setIsCheckboxMoviesActive(updateState)
    localStorage.setItem('MoviesCheckbox', updateState)
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
    localStorage.setItem('FiltredMovies', JSON.stringify(filtredMovies))
    setFiltredMoviesList(filtredMovies)
    if (isCheckboxMoviesActive) {
      const filtredShortMovies = filtredMovies.filter(movie => movie.duration <= 40)
      setFiltredMoviesList(filtredShortMovies)
    }
  }, [moviesList, isCheckboxMoviesActive])
  
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    saveSearch()
    await getMovies()
    renderMovies()
  }

  useEffect(() => {
    renderMovies()
  }, [renderMovies, isCheckboxMoviesActive])

  useEffect(() => {
    const storedMovies = localStorage.getItem('Movies');
    if (storedMovies) {
      setMoviesList(JSON.parse(storedMovies));
      const stateCheckbox = localStorage.getItem('MoviesCheckbox') === 'true'
      setIsCheckboxMoviesActive(stateCheckbox)
      renderMovies()
    } else {
      return;
    }
  }, []);

  // useEffect(() => {
  //   localStorage.setItem('FiltredMovies', JSON.stringify(filtredMoviesList))
  // }, [filtredMoviesList])


  return (
    <main className="movies">
      <SearchForm inputValues={values} onChange={handleChange} onSubmit={handleSubmit} onShort={handleCheckbox} checked={isCheckboxMoviesActive}/>
      <MoviesCardList moviesList={filtredMoviesList} isLoading={isLoading} addFavoritMovies={addFavoritMovies} />
      <button className="movies__button" type="button">Ещё</button>
    </main>
  )
}

export default Movies;