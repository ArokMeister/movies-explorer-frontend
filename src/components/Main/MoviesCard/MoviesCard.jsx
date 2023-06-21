import { useState } from "react";
import { useLocation } from "react-router-dom";

import "./MoviesCard.css";

function MoviesCard({ movie }) {
  const [liked, setLiked] = useState(false);
  const location = useLocation();
  const handleClick = () => {
    setLiked(!liked) 
  }

  function changeButton() {
    if (location.pathname === "/movies") {
      return (`card__button ${liked && 'card__button_active'}`)
    }
    if (location.pathname === "/saved-movies") {
      return ("card__button card__button_delete")
    }
  }

  function formatTime(minutes) {
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;
    if (mins === 0) { // Проверяем, делится ли минуты нацело
      return `${hours} ч`; // Возвращаем только часы
    } else {
      return `${hours} ч ${mins} м`; // Иначе возвращаем часы и минуты
    }
  }
  
  return (
    <li className="card">
      <img className="card__image" src={`https://api.nomoreparties.co/${movie.image.url}`} alt="Изображение фильма" />
      <div className="card__info">
        <div className="card__description">
          <p className="card__title">{movie.nameRU}</p>
          <button className={changeButton()} onClick={handleClick} type="button" aria-label="Кнопка лайка" />
        </div>
        <p className="card__duration">{formatTime(movie.duration)}</p>
      </div>
    </li>
  )
}

export default MoviesCard;