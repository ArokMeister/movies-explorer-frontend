import { Link } from "react-router-dom";
import { staticSite, adaptiveSite, singlePageApplication } from "../../../utils/constants";


function Portfolio () {
  return (
    <section className="portfolio">
      <div className="portfolio__container container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__list-item">
            <Link className="portfolio__list-link" to={staticSite} target="_blank">Статичный сайт <span>↗</span></Link>
          </li>
          <li className="portfolio__list-item">
            <Link className="portfolio__list-link" to={adaptiveSite} target="_blank">Адаптивный сайт <span>↗</span></Link>
          </li>
          <li className="portfolio__list-item">
            <Link className="portfolio__list-link" to={singlePageApplication} target="_blank">Одностраничное приложение <span>↗</span></Link>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Portfolio;