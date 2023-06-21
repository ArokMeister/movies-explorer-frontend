import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ getMovie, moviesList, render }) {
  return (
    <section className="saved-movies">
      <SearchForm getMovie={getMovie} />
      <MoviesCardList moviesList={moviesList} render={render} />
    </section>
  )
}

export default SavedMovies;