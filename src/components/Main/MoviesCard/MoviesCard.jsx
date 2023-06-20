import { useState } from "react";

function MoviesCard({ props }) {
  const [liked, setLiked] = useState(false);
  
  const handleClick = () => {
    setLiked(!liked) 
  }
  
  return (
    <li className="card">
      <img className="card__image" src="https://img5.goodfon.ru/wallpaper/big/a/fa/peyton-list-devushka-glaza-vzgliad-kofta-ruki.jpg" alt="Изображение фильма" />
      <div className="card__info">
        <div className="card__description">
          <p className="card__title">Film name</p>
          <button className={`card__button ${liked && 'card__button_active'}`} onClick={handleClick} type="button" aria-label="Кнопка лайка" />
        </div>
        <p className="card__duration">1 h 32 m</p>
      </div>
    </li>
  )
}

export default MoviesCard;