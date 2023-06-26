import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useCastomForm, useFormWithValidation } from "../../../utils/hook/useForm";
import { useState } from "react";

function SavedMovies({ savedMoviesList, deleteFavoritMovies }) {
  
  const [filtredSavedMovies, setFiltredSavedMovies] = useState(savedMoviesList)
  const { values, handleChange, setValues } = useCastomForm();

  const renderMovies = () => {
    const keyword = values.search
    const filtredMovies = savedMoviesList.filter(movie => movie.nameRU.includes(keyword) || movie.nameEN.includes(keyword)) 
    setFiltredSavedMovies(filtredMovies)
  }
  
  const handleSubmit = async (evt) => {
    evt.preventDefault();
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

  // useEffect(() => {
  //   renderMovies()
  // }, [renderMovies, shortMovie])

  return (
    <main className="saved-movies">
      <SearchForm inputValues={values} onChange={handleChange} onSubmit={handleSubmit} />
      <MoviesCardList moviesList={filtredSavedMovies} deleteFavoritMovies={deleteFavoritMovies}/>
    </main>
  )
}

export default SavedMovies;