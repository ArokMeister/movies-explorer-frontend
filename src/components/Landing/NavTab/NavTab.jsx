import { HashLink } from "react-router-hash-link";

import "./NavTab.css";

function NavTab () {
  return (
    <section className="navtab">
      <nav className="navtab__container container">
        <ul className="navtab__list">
          <li className="navtab__item"><HashLink className="navtab__link" to="/#project" smooth>О проекте</HashLink></li>
          <li className="navtab__item"><HashLink className="navtab__link" to="/#techs" smooth>Технологии</HashLink></li>
          <li className="navtab__item"><HashLink className="navtab__link" to="/#student" smooth>Студент</HashLink></li>
        </ul>
      </nav>
    </section>
  )
}

export default NavTab;