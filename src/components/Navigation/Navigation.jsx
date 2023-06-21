import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import "./Navigation.css";

function Navigation({ loggedIn }) {
  
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const focusPage = (link, className) => {
    const focusUrl = location.pathname;
    if (focusUrl === link) {
      return className
    } else {
      return ''
    }
  }

  const landingHeader = (link, className) => {
    const landingPage = location.pathname;
    if (landingPage === link) {
      return ""
    } else {
      return className
    }
  }
  
  return (
    <nav className={`navigation ${isMenuOpen ? "navigation__bg" : ""}`}>
      <button className={`burger ${isMenuOpen ? "close" : ""}`} onClick={toggleMenu}>
        <span className="burger__span"></span>
        <span className="burger__span"></span>
        <span className="burger__span"></span>
      </button>
      <ul className={`navigation__list navigation__list-burger ${isMenuOpen ? "open" : ""}`}>
        {loggedIn ?
          <>
            <li className="navigation__list-item hiden">
              <Link className={`navigation__list-link ${focusPage('/', 'focus')}`} to="/">Главная</Link>
            </li>
            <li className="navigation__list-item">
              <Link className={`navigation__list-link ${focusPage('/movies', 'focus')}`} to="/movies">Фильмы</Link>
            </li>
            <li className="navigation__list-item">
              <Link className={`navigation__list-link ${focusPage('/saved-movies', 'focus')}`} to="/saved-movies">Сохраненные фильмы</Link>
            </li>
            <li className="navigation__list-item account">
              <Link className={`navigation__list-link ${focusPage('/profile', 'focus')}`} to="/profile">Аккаунт <div className="navigation__list-icon" /></Link>
            </li>
          </> 
          :
          <>
            <li className="navigation__list-item">
              <Link className="navigation__list-link white" to="/signup">Регистрация</Link>
            </li>
            <li className="navigation__list-item">
              <Link className="navigation__list-link active" to="/signin">Войти</Link>
            </li>
          </>
        }
      </ul>
    </nav>
  )
}

export default Navigation;

