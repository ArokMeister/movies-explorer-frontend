import { Link, useLocation } from "react-router-dom";

function Footer () {
  const currentYear = new Date();
  
  const location = useLocation();
  const hideFooter = location.pathname !== "/";

  return (
    <footer className={hideFooter ? "footer_hide" : "footer"}>
      <div className="footer__container container">
        <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
        <p className="footer__copyright">{`© ${currentYear.getFullYear()}`}</p>
        <nav className="footer__nav-list">
            <Link className="footer__nav-link">Яндекс.Практикум</Link>
            <Link className="footer__nav-link">Github</Link>
        </nav>
      </div>
    </footer>
  )
}

export default Footer;