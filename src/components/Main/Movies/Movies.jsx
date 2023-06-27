import { useEffect, useState, useCallback } from "react";
import { useCastomForm } from "../../../utils/hook/useForm";
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import movies from '../../../utils/MoviesApi';
import { PC, TAB, MOBILE, 
  RENDER_CARD_ON_PC, RENDER_CARD_ON_TAB, RENDER_CARD_ON_MOBILE,
  RENDER_IF_PUSH_MORE_PC, RENDER_IF_PUSH_MORE_TAB, RENDER_IF_PUSH_MORE_MOBILE } from "../../../utils/constants";

import './Movies.css';

function Movies({ isLoading, addFavoritMovies, savedMoviesList }) {

  const [moviesList, setMoviesList] = useState([]);
  const [filtredMoviesList, setFiltredMoviesList] = useState([]);

  const [isCheckboxMoviesActive, setIsCheckboxMoviesActive] = useState(false);

  const [cardsCount, setCardsCount] = useState(0);
  const [maxCardsCount, setMaxCardsCount] = useState(0);

  const { values, handleChange } = useCastomForm();

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
    if (window.innerWidth >= PC) {
      setMaxCardsCount(RENDER_CARD_ON_PC);
    } else if (window.innerWidth >= TAB) {
      setMaxCardsCount(RENDER_CARD_ON_TAB);
    } else if (window.innerWidth <= MOBILE){
      setMaxCardsCount(RENDER_CARD_ON_MOBILE);
    }
  }, [moviesList, isCheckboxMoviesActive])

  const handleLoadMore = () => {
    if (window.innerWidth >= PC) {
      setCardsCount(cardsCount + RENDER_IF_PUSH_MORE_PC);
    } else if (window.innerWidth >= TAB) {
      setCardsCount(cardsCount + RENDER_IF_PUSH_MORE_TAB);
    } else if (window.innerWidth <= MOBILE) {
      setCardsCount(cardsCount + RENDER_IF_PUSH_MORE_MOBILE);
    }
  }
  
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
    setCardsCount(maxCardsCount);
    window.addEventListener("resize", renderMovies);
    return () => window.removeEventListener("resize", renderMovies);
  }, [maxCardsCount]);

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

  return (
    <main className="movies">
      <SearchForm inputValues={values} onChange={handleChange} onSubmit={handleSubmit} onShort={handleCheckbox} checked={isCheckboxMoviesActive}/>
      <MoviesCardList moviesList={filtredMoviesList.slice(0, cardsCount)} savedMoviesList={savedMoviesList} isLoading={isLoading} addFavoritMovies={addFavoritMovies} />
      {filtredMoviesList.length <= cardsCount ? null : (
        <button className="movies__button" type="button" onClick={handleLoadMore}>Ещё</button>
      )}
    </main>
  )
}

export default Movies;