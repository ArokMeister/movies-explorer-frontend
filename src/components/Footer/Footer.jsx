import { Link, useLocation } from "react-router-dom";
import { YANDEX_SITE, MY_GITHUB } from "../../utils/constants";

import "./Footer.css";

function Footer () {
  const currentYear = new Date();
  const footerRoutes = [ "/", "/movies", "/saved-movies" ]
  const { pathname } = useLocation();
  const hideFooter = footerRoutes.includes(pathname);

  return (
    hideFooter &&
      <footer className={hideFooter ? "footer" : "footer_hide"}>
        <div className="footer__container container">
          <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
          <p className="footer__copyright">{`© ${currentYear.getFullYear()}`}</p>
          <nav className="footer__nav-list">
            <Link className="footer__nav-link" to={YANDEX_SITE} target="_blank">Яндекс.Практикум</Link>
            <Link className="footer__nav-link" to={MY_GITHUB} target="_blank">Github</Link>
          </nav>
        </div>
      </footer>
  )
}

export default Footer;