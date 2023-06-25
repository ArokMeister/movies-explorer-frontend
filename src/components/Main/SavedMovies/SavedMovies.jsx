import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useCastomForm, useFormWithValidation } from "../../../utils/hook/useForm";
import { useState } from "react";

function SavedMovies({ savedMoviesList }) {
  
  const [filtredSavedMovies, setFiltredSavedMovies] = useState(savedMoviesList)
  const { values, handleChange, setValues } = useCastomForm();

  const renderMovies = () => {
    const keyword = values.search
    const filtredMovies = savedMoviesList.filter(movie => movie.nameRU.includes(keyword) || movie.nameEN.includes(keyword)) 
    setFiltredSavedMovies(filtredMovies)
  }
  
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log(savedMoviesList)
    renderMovies()
  }

  return (
    <main className="saved-movies">
      <SearchForm inputValues={values} onChange={handleChange} onSubmit={handleSubmit} />
      <MoviesCardList moviesList={filtredSavedMovies} />
    </main>
  )
}

export default SavedMovies;