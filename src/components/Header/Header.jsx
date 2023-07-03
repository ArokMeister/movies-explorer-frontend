import { useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

import "./Header.css";

function Header({ loggedIn, goLanding }) {

  const { pathname } = useLocation();
  const headerRoutes = [ "/", "/profile", "/movies", "/saved-movies" ];
  const hideHeader = headerRoutes.includes(pathname);
  const headerTransparent = pathname === '/' ? {backgroundColor: '#465DFF'} : {backgroundColor: 'transparent'}

  return (
    hideHeader &&
    <header className={hideHeader ? "header" : "header_hide"} style={headerTransparent}>
      <div className="header__container container">
        <img className="header__logo" src={logo} alt="Логотип сайта" onClick={goLanding} />
        <Navigation loggedIn={loggedIn} />
      </div>
    </header>
  )
}

export default Header;