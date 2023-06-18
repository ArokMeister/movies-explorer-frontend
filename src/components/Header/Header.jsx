import { useLocation } from 'react-router-dom';
import logo from '../../images/logo_1.svg';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {

  const location = useLocation();
  const hideHeader = location.pathname === "/signin" || location.pathname === "/signup" ? "header_hide" : "header";
  const headerTransparent = location.pathname === '/' ? {backgroundColor: '#073042'} : {backgroundColor: 'transparent'}

  return (
    <header className={hideHeader} style={headerTransparent}>
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