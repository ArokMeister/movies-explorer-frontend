import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";

import { IMAGE_URL_BEAT_FILMS } from "../../../utils/constants";
import { formatTime } from "../../../utils/formatTime";

import "./MoviesCard.css";
import { Link } from "react-router-dom";

function MoviesCard({ movie, addFavoritMovies, deleteFavoritMovies, deleteBeatMovies, isSaved }) {

  const [liked, setLiked] = useState(false);

  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === '/movies') {
      setLiked(!liked);
      if (!liked) {
        addFavoritMovies(movie);
      } else {
        deleteBeatMovies(movie._id || movie.id);
      }
    }
    if (location.pathname === '/saved-movies') {
      setLiked(!liked);
      deleteFavoritMovies(movie._id)
    } 
  }

  const changeButton = useCallback(() => {
    if (location.pathname === "/movies") {
      return (`card__button ${(liked) && 'card__button_active'}`)
    }
    if (location.pathname === "/saved-movies") {
      return ("card__button card__button_delete")
    }
  }, [liked, location.pathname])

  function changeURL() {
    if (location.pathname === "/movies") {
      return (`${IMAGE_URL_BEAT_FILMS}${movie.image.url}`)
    }
    if (location.pathname === "/saved-movies") {
      return (`${movie.image}`)
    }
  }

  useEffect(() => {
    changeButton();
  }, [changeButton])

  useEffect(() => {
    if (isSaved) {
      setLiked(true);
    }
  }, [isSaved])

  return (
    <article className="card">
      <Link className="card__link" to={movie.trailerLink} target="_blank" />
      <img className="card__image" src={changeURL()} alt={movie.nameRU} />
      <button className={changeButton()} onClick={handleClick} type="button" aria-label="Функциональная кнопка лайка и удаления" />
      <div className="card__info">
        <p className="card__title">{movie.nameRU}</p>
        <p className="card__duration">{formatTime(movie.duration)}</p>
      </div>
    </article> 
  )
}

export default MoviesCard;
























// function MoviesCard({ movie, addFavoritMovies, deleteFavoritMovies, isSaved }) {

//   const [liked, setLiked] = useState(false);

//   const location = useLocation();

//   const handleClick = () => {
//     if (location.pathname === '/movies') {
//       setLiked(!liked);
//       addFavoritMovies(movie);
//     }
//     if (location.pathname === '/saved-movies') {
//       setLiked(!liked);
//       deleteFavoritMovies(movie._id)
//     } 
//   }

//   const changeButton = useCallback(() => {
//     if (location.pathname === "/movies") {
//       return (`card__button ${(liked || isSaved) && 'card__button_active'}`)
//     }
//     if (location.pathname === "/saved-movies") {
//       return ("card__button card__button_delete")
//     }
//   }, [isSaved, liked, location.pathname])

//   function changeURL() {
//     if (location.pathname === "/movies") {
//       return (`https://api.nomoreparties.co${movie.image.url}`)
//     }
//     if (location.pathname === "/saved-movies") {
//       return (`${movie.image}`)
//     }
//   }

//   function formatTime(minutes) {
//     let hours = Math.floor(minutes / 60);
//     let mins = minutes % 60;
//     if (mins === 0) { // Проверяем, делится ли минуты нацело
//       return `${hours}ч`; // Возвращаем только часы
//     } else if (hours === 0) {
//       return `${mins}м`; // Иначе возвращаем часы и минуты
//     } else {
//       return `${hours}ч ${mins}м`
//     }
//   }

//   useEffect(() => {
//     changeButton()
//   }, [changeButton])

//   return (
//     <article className="card">
//       <img className="card__image" src={changeURL()} alt={movie.nameRU} />
//       <button className={changeButton()} onClick={handleClick} type="button" aria-label="Функциональная кнопка лайка и удаления" />
//       <div className="card__info">
//         <p className="card__title">{movie.nameRU}</p>
//         <p className="card__duration">{formatTime(movie.duration)}</p>
//       </div>
//     </article> 
//   )
// }

// export default MoviesCard;