import { useEffect, useState, useCallback } from "react";
import { useCastomForm } from "../../../utils/hook/useForm";
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import movies from '../../../utils/MoviesApi';
import Preloader from "../Preloader/Preloader";

import { PC_RESOLUTION, TAB_RESOLUTION, MOBILE_RESOLUTION,
  WIDE_PC_RENDER_CARD, REGULAR_PC_RENDER_CARD, TAB_RENDER_CARD, MOBILE_RENDER_CARD,
  PC_MORE_CARD, TAB_MORE_CARD, MOBILE_MORE_CARD } from "../../../utils/constants/index";

import './Movies.css';

function Movies({ addFavoritMovies, deleteBeatMovies, savedMoviesList }) {

  const [moviesList, setMoviesList] = useState([]);
  const [filtredMoviesList, setFiltredMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isCheckboxMoviesActive, setIsCheckboxMoviesActive] = useState(false);
  const [isPastSearch, setIsPastSearch] = useState('')

  const [cardsCount, setCardsCount] = useState(0);
  const [maxCardsCount, setMaxCardsCount] = useState(0);

  const { values, handleChange } = useCastomForm();

  const handleCheckbox = () => {
    const updateState = !isCheckboxMoviesActive;
    setIsCheckboxMoviesActive(updateState)
    localStorage.setItem('MoviesCheckbox', updateState)
  }

  const saveSearch = () => {
    localStorage.setItem('Search', values.search || '')
  }

  const getSearch = () => {
    return localStorage.getItem('Search') || ''
  }

  const getMovies = async () => {
    try {
      if (localStorage.getItem('Movies')) {
        const parsDataLS = JSON.parse(localStorage.getItem('Movies'))
        setMoviesList(parsDataLS)
      } else {
        setIsLoading(true)
        const moviesList = await movies.getMoviesData();
        localStorage.setItem('Movies', JSON.stringify(moviesList));
        setMoviesList(moviesList)
      }
    } catch(err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }
  
  const renderMovies = useCallback(() => {
    const keyword = getSearch().toLowerCase()
    const filtredMovies = moviesList.filter(movie => movie.nameRU.toLowerCase().includes(keyword) || movie.nameEN.toLowerCase().includes(keyword))
    localStorage.setItem('FiltredMovies', JSON.stringify(filtredMovies))
    setFiltredMoviesList(filtredMovies)
    if (isCheckboxMoviesActive) {
      const filtredShortMovies = filtredMovies.filter(movie => movie.duration <= 40)
      setFiltredMoviesList(filtredShortMovies)
    }
    if (window.innerWidth >= PC_RESOLUTION) {
      setMaxCardsCount(WIDE_PC_RENDER_CARD);
    } else if (window.innerWidth >= TAB_RESOLUTION) {
      setMaxCardsCount(REGULAR_PC_RENDER_CARD);
    } else if (window.innerWidth >= MOBILE_RESOLUTION) {
      setMaxCardsCount(TAB_RENDER_CARD);
    } else {
      setMaxCardsCount(MOBILE_RENDER_CARD);
    }
  }, [moviesList, isCheckboxMoviesActive])

  const handleLoadMore = () => {
    if (window.innerWidth >= PC_RESOLUTION) {
      setCardsCount(cardsCount + PC_MORE_CARD);
    } else if (window.innerWidth >= TAB_RESOLUTION) {
      setCardsCount(cardsCount + TAB_MORE_CARD)
    } else {
      setCardsCount(cardsCount + MOBILE_MORE_CARD);
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
  }, [maxCardsCount, renderMovies]);

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

  useEffect(() => {
    setIsPastSearch(getSearch())
  }, [])

  return (
    <main className="movies">
      <SearchForm 
        inputValues={values} 
        onChange={handleChange} 
        onSubmit={handleSubmit} 
        onShort={handleCheckbox} 
        checked={isCheckboxMoviesActive}
        isPastSearch={isPastSearch}
      />
      {moviesList?.length === 0 || filtredMoviesList.length > 0 ? null : <p className="movies__notfound">Ничего не найдено</p>}
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList 
          moviesList={filtredMoviesList.slice(0, cardsCount)} 
          savedMoviesList={savedMoviesList} 
          addFavoritMovies={addFavoritMovies} 
          deleteBeatMovies={deleteBeatMovies} 
          isLoading={isLoading}/>
      )}
      {filtredMoviesList.length <= cardsCount ? null : (
        <button className="movies__button" type="button" onClick={handleLoadMore}>Ещё</button>
      )}
    </main>
  )
}

export default Movies;