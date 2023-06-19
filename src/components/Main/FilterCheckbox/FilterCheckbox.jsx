function FilterCheckbox() {
  return (
    <div className="filter__container">
      <p className="filter__text">Короткометражки</p>
      <label className="filter__switch">
        <input className="filter__input" type="checkbox" />
        <span className="filter__slider" />
      </label>
    </div>
  )
}

export default FilterCheckbox;
