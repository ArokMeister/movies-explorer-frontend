import { Link } from 'react-router-dom';
import logo from '../../images/header_logo_unauthorize.svg';

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип сайта" />
      <div className="header__container">
        <Link to="/signin" className="header__link">Регистрация</Link>
        <Link to="/signup" className="header__link active">Войти</Link>
      </div>
    </header>
  )
}

export default Header;