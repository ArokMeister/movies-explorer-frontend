import { useLocation } from 'react-router-dom';
import logo from '../../images/logo_1.svg';
import Navigation from '../Navigation/Navigation';

import "./Header.css";

function Header({ loggedIn }) {

  const location = useLocation();
  const headerRoutes = [ "/", "/profile", "/movies", "/saved-movies" ];
  const hideHeader = headerRoutes.includes(location.pathname);
  const headerTransparent = location.pathname === '/' ? {backgroundColor: '#073042'} : {backgroundColor: 'transparent'}

  return (
    hideHeader &&
    <header className={hideHeader ? "header" : "header_hide"} style={headerTransparent}>
      <div className="header__container container">
        <img className="header__logo" src={logo} alt="Логотип сайта" />
        <nav className="header__nav-list">
          <Navigation loggedIn={loggedIn} />
        </nav>
      </div>
    </header>
  )
}

export default Header;