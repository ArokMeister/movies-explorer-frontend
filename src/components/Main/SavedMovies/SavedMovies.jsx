import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ getMovie, moviesList, render }) {
  return (
    <main className="saved-movies">
      <SearchForm getMovie={getMovie} />
      <MoviesCardList moviesList={moviesList} render={render} />
    </main>
  )
}

export default SavedMovies;