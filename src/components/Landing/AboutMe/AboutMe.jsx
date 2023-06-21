import { Link } from "react-router-dom";
import studentImage from "../../../images/student.jpg";

import "./AboutMe.css";

function AboutMe () {
  return (
    <section className="student" id="student">
      <div className="student__container container">
        <h2 className="student__title">Студент</h2>
        <div className="student__container-info">
          <img className="student__photo" src={studentImage} alt="Фото студента" />
          <div className="student__container-text">
            <h3 className="student__subtitle">Денис</h3>
            <p className="student__text">Фронтенд - разработчик, 30 лет</p>
            <p className="student__text-about">Я&nbsp;живу в&nbsp;Санкт-Петербурге. Закончил факультет техносферной безопасности в&nbsp;СПбГЛТУ имени С.&nbsp;М.&nbsp;Кирова. Люблю слушать музыку, смотреть сериалы и&nbsp;мотоциклы. Писать код начал чуть меньше года назад. По&nbsp;началу кодинг был как хобби, но&nbsp;потом принял решение заняться этим серьезно.</p>
            <Link className="student__link" to="https://github.com/ArokMeister" target="_blank">Github</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutMe;