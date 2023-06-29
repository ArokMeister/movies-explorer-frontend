import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

function SearchForm({ inputValues, onChange, onSubmit, onShort, checked }) {

  return (
    <div className="search__container container">
      <form className="search__form" onSubmit={onSubmit}>
        <input 
          className="search__input"
          placeholder="Фильм"
          name="search"
          id="search"
          value={inputValues.search || ''}
          onChange={onChange}
          type="text"
          autoComplete="off"
          />
          <button className="search__btn" type="submit" >Найти</button>
      </form>
      <FilterCheckbox onShort={onShort} checked={checked}/>
    </div>
  )
}

export default SearchForm;