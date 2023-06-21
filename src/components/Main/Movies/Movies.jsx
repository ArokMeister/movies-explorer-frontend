import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ moviesList, render, }) {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList moviesList={moviesList} render={render} />
    </section>
  )
}

export default Movies;