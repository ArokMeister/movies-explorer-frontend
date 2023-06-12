function AboutProject () {
  return (
    <div className="project">
      <h2 className="project__title">О проекте</h2>
      <hr className="project__line" />
      <h3 className="project__subtitle project__left_1">Дипломный проект включал 5 этапов</h3>
      <h3 className="project__subtitle project__right_1">На выполнение диплома ушло 5 недель</h3>
      <p className="project__text project__left_2">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
      <p className="project__text project__right_2">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      <p className="project__text project__left_3 project__text_center project__text_active">1 неделя</p>
      <p className="project__text project__right_3 project__text_center project__text_unactive">4 недели</p>
      <p className="project__text project__left_4 project__text_center">Back-end</p>
      <p className="project__text project__right_4 project__text_center">Front-end</p>
    </div>
  )
}

export default AboutProject;