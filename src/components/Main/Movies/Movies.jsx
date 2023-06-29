import { useEffect, useState, useCallback } from "react";
import { useCastomForm } from "../../../utils/hook/useForm";
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import movies from '../../../utils/MoviesApi';

import './Movies.css';

function Movies({ isLoading, addFavoritMovies, deleteBeatMovies, savedMoviesList }) {

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
    if (window.innerWidth >= 1280) {
      setMaxCardsCount(12);
    } else if (window.innerWidth >= 768) {
      setMaxCardsCount(8);
    } else if (window.innerWidth >= 480){
      setMaxCardsCount(5);
    }
  }, [moviesList, isCheckboxMoviesActive])

  const handleLoadMore = () => {
    if (window.innerWidth >= 1280) {
      setCardsCount(cardsCount + 4);
    } else if (window.innerWidth >= 1150) {
      setCardsCount(cardsCount + 3)
    } else if (window.innerWidth >= 768) {
      setCardsCount(cardsCount + 2);
    } else if (window.innerWidth >= 480) {
      setCardsCount(cardsCount + 1);
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

  return (
    <main className="movies">
      <SearchForm inputValues={values} onChange={handleChange} onSubmit={handleSubmit} onShort={handleCheckbox} checked={isCheckboxMoviesActive}/>
      {filtredMoviesList?.length === 0 ? <p className="movies__notfound">Ничего не найдено</p> : null}
      <MoviesCardList moviesList={filtredMoviesList.slice(0, cardsCount)} savedMoviesList={savedMoviesList} addFavoritMovies={addFavoritMovies} deleteBeatMovies={deleteBeatMovies} />
      {filtredMoviesList.length <= cardsCount ? null : (
        <button className="movies__button" type="button" onClick={handleLoadMore}>Ещё</button>
      )}
    </main>
  )
}

export default Movies;