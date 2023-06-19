import SearchForm from "../SearchForm/SearchForm"

function Movies({ getMovie }) {
  return (
    <section className="movies">
      <SearchForm getMovie={getMovie} />
    </section>
  )
}

export default Movies;