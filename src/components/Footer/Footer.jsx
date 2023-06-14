import { Link } from "react-router-dom";

function Footer () {
  const currentYear = new Date();

  return (
    <footer className="footer">
      <div className="footer__container">
        <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
        <span className="footer__line" />
        <div className="footer__container-info">
          <p className="footer__copyright">{`© ${currentYear.getFullYear()}`}</p>
          <div className="footer__container-links">
            <Link className="footer__link">Яндекс.Практикум</Link>
            <Link className="footer__link">Github</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;