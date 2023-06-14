import { Link } from "react-router-dom";
import { staticSite, adaptiveSite, singlePageApplication } from "../../../utils/constants";


function Portfolio () {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Портфолио</h2>
        <div className="portfolio__container-links">
          <Link className="portfolio__link" to={staticSite} target="_blank">Статичный сайт <span>↗</span></Link>
          <span className="portfolio__line" />
          <Link className="portfolio__link" to={adaptiveSite} target="_blank">Адаптивный сайт <span>↗</span></Link>
          <span className="portfolio__line" />
          <Link className="portfolio__link" to={singlePageApplication} target="_blank">Одностраничное приложение <span className="portfolio__link-arrow">↗</span></Link>
        </div>
      </div>
    </section>
  )
}

export default Portfolio;