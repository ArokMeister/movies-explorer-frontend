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
  
  return (
    <>
      {location.pathname === "/" &&
        <nav className="navigation__landing">
          <ul className="navigation__landing-list">
            <li className="navigation__landing-item">
              <Link className="navigation__landing-link white" to="/signup">Регистрация</Link>
            </li>
            <li className="navigation__landing-item">
              <Link className="navigation__landingt-link active" to="/signin">Войти</Link>
            </li>
          </ul>
        </nav>
      }
      {location.pathname !== "/" &&
        <nav className={`navigation ${isMenuOpen ? "navigation__bg" : ""}`}>
          <button className={`burger ${isMenuOpen ? "close" : ""}`} onClick={toggleMenu}>
            <span className="burger__span"></span>
            <span className="burger__span"></span>
            <span className="burger__span"></span>
          </button>
          <ul className={`navigation__list navigation__list-burger ${isMenuOpen ? "open" : ""}`}>
              <div className="navigation__list-center">
                <li className="navigation__list-item hiden">
                  <Link className={`navigation__list-link ${focusPage('/', 'focus')}`} to="/">Главная</Link>
                </li>
                <li className="navigation__list-item">
                  <Link className={`navigation__list-link ${focusPage('/movies', 'focus')}`} to="/movies">Фильмы</Link>
                </li>
                <li className="navigation__list-item">
                  <Link className={`navigation__list-link ${focusPage('/saved-movies', 'focus')}`} to="/saved-movies">Сохраненные фильмы</Link>
                </li>
              </div>
              <li className="navigation__list-item account">
                <Link className="navigation__list-link" to="/profile">Аккаунт <div className="navigation__list-icon" /></Link>
              </li>
           </ul>
        </nav>
      }
  </>
)}

export default Navigation;

