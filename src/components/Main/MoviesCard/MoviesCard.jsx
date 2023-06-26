import { useState } from "react";
import { useLocation } from "react-router-dom";

import "./MoviesCard.css";
import Preloader from "../Preloader/Preloader";

function MoviesCard({ movie, isLoading, addFavoritMovies, deleteFavoritMovies }) {
  const [liked, setLiked] = useState(false);
  const location = useLocation();

  const handleClick = () => {
    // if (location.pathname === '/movies')
    // setLiked(!liked);
    // addFavoritMovies(movie);
    // if (location.pathname === '/saved-movies') {
      deleteFavoritMovies(movie._id)
    // } else {
    //   setLiked(!liked);
    //   addFavoritMovies(movie);
    // }
      
  }

  function changeButton() {
    if (location.pathname === "/movies") {
      return (`card__button ${liked && 'card__button_active'}`)
    }
    if (location.pathname === "/saved-movies") {
      return ("card__button card__button_delete")
    }
  }

  function changeURL() {
    if (location.pathname === "/movies") {
      return (`https://api.nomoreparties.co${movie.image.url}`)
    }
    if (location.pathname === "/saved-movies") {
      return (`${movie.image}`)
    }
  }

  function formatTime(minutes) {
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;
    if (mins === 0) { // Проверяем, делится ли минуты нацело
      return `${hours}ч`; // Возвращаем только часы
    } else if (hours === 0) {
      return `${mins}м`; // Иначе возвращаем часы и минуты
    } else {
      return `${hours}ч ${mins}м`
    }
  }

  if (isLoading) {
    return <Preloader />
  }
  
  return (
    <li className="card">
      <img className="card__image" src={changeURL()} alt={movie.nameRU} />
      <button className={changeButton()} onClick={handleClick} type="button" aria-label="Кнопка лайка" />
      <div className="card__info">
        <p className="card__title">{movie.nameRU}</p>
        <p className="card__duration">{formatTime(movie.duration)}</p>
      </div>
    </li>
  )
}

export default MoviesCard;