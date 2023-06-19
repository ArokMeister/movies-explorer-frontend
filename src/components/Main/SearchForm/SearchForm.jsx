import FilterCheckbox from "../FilterCheckbox/FilterCheckbox"

function SearchForm({ getMovie }) {
  return (
    <div className="search__container container">
      <form className="search__form">
        <input 
          className="search__input"
          placeholder="Фильм"
          name="search"
          id="search"
          type="text"
          autoComplete="off"
          />
          <button className="search__btn" onClick={getMovie} type="button"/>
      </form>
      <FilterCheckbox />
    </div>
  )
}

export default SearchForm;