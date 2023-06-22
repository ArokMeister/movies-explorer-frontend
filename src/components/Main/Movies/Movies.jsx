import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ moviesList, render, isLoading }) {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList moviesList={moviesList} render={render} isLoading={isLoading} />
    </section>
  )
}

export default Movies;