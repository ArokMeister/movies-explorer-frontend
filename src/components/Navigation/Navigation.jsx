import { Link, useLocation } from "react-router-dom";
// import accountIcon from "../../images/account_icon.svg";


function Navigation({ loggedIn }) {
  
  const location = useLocation();

  const focusPage = (link, className) => {
    
    const focusUrl = location.pathname;

    if (focusUrl === link) {
      return className
    } else {
      return ''
    }
  }
  
  return (
    <ul className="navigation__list">
      {loggedIn ?
        <>
          <li className="navigation__list-item">
            <Link className={`navigation__list-link ${focusPage('/movies', 'focus')}`} to="/movies">Фильмы</Link>
          </li>
          <li className="navigation__list-item">
            <Link className={`navigation__list-link ${focusPage('/saved-movies', 'focus')}`} to="/saved-movies">Сохраненные фильмы</Link>
          </li>
          <li className="navigation__list-item account">
            <Link className={`navigation__list-link ${focusPage('/profile', 'focus')}`} to="/profile">Аккаунт</Link><span className="navigation__list-icon"/>
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
  )
}

export default Navigation;