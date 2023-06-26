import "./FilterCheckbox.css";

function FilterCheckbox({ onShort }) {
  return (
    <div className="filter__container">
      <p className="filter__text">Короткометражки</p>
      <label className="filter__switch">
        <input className="filter__input" type="checkbox" onClick={onShort}/>
        <span className="filter__slider" />
      </label>
    </div>
  )
}

export default FilterCheckbox;
