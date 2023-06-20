import FilterCheckbox from "../FilterCheckbox/FilterCheckbox"

function SearchForm({ getMovie }) {
  return (
    <div className="search__container container">
      <form className="search__form" onClick={getMovie}>
        <input 
          className="search__input"
          placeholder="Фильм"
          name="search"
          id="search"
          type="text"
          autoComplete="off"
          />
          <button className="search__btn" onClick={getMovie} type="submit"/>
      </form>
      <FilterCheckbox />
    </div>
  )
}

export default SearchForm;