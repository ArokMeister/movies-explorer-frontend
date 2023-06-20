import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ getMovie, moviesList }) {
  return (
    <section className="movies">
      <SearchForm getMovie={getMovie} />
      <MoviesCardList moviesList={moviesList} />
    </section>
  )
}

export default Movies;