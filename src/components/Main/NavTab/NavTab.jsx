import { Link } from "react-router-dom";

function NavTab () {
  return (
    <section className="navtab">
      <Link className="navtab__link" to='/#project'>О проекте</Link>
      <Link className="navtab__link" to='/#tech'>Технологии</Link>
      <Link className="navtab__link" to='/#student'>Студент</Link>
    </section>
  )
}

export default NavTab;