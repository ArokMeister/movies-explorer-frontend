import { HashLink } from "react-router-hash-link";
import "./Promo.css";
import promo_logo from "../../../images/landing_img.svg"

function Promo () {

  return (
    <section className='promo'>
      <div className="promo__container container">
        <img className="promo__img" src={promo_logo} alt="Промо изображение" />
        <div className="promo__info">
          <h1 className="promo__info-title">Учебный проект студента факультета Веб-разработки.</h1>
          <p className="promo__info-subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <HashLink className="promo__info-link" to="/#project" smooth>Узнать больше</HashLink>
        </div>
        
      </div>
    </section>
  )
}

export default Promo;