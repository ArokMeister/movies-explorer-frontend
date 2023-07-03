import { Link } from "react-router-dom";
import { STATIC_SITE, ADAPTIVE_SITE, SINGLE_PAGE_APLICATION } from "../../../utils/constants";

import "./Portfolio.css";

function Portfolio () {
  return (
    <section className="portfolio">
      <div className="portfolio__container container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__list-item">
            <Link className="portfolio__list-link" to={STATIC_SITE} target="_blank">Статичный сайт <span>↗</span></Link>
          </li>
          <li className="portfolio__list-item">
            <Link className="portfolio__list-link" to={ADAPTIVE_SITE} target="_blank">Адаптивный сайт <span>↗</span></Link>
          </li>
          <li className="portfolio__list-item">
            <Link className="portfolio__list-link" to={SINGLE_PAGE_APLICATION} target="_blank">Одностраничное приложение <span>↗</span></Link>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Portfolio;