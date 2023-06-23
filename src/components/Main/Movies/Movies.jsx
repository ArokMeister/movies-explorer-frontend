import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ moviesList, render, isLoading }) {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList moviesList={moviesList} render={render} isLoading={isLoading} />
    </main>
  )
}

export default Movies;