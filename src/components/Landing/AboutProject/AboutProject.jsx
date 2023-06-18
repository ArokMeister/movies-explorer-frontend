function AboutProject () {
  return (
    <section className="project" id="project">
      <div className="project__container container">
        <div className="project__container-about">
          <h2 className="project__title">О проекте</h2>
          <span className="project__line" />
          <h3 className="project__subtitle">Дипломный проект включал 5 этапов</h3>
          <h3 className="project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          <p className="project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
        <div className="project__container-roadmap">
          <p className="project__text project__text_center project__text_active">1 неделя</p>
          <p className="project__text project__text_center project__text_unactive">4 недели</p>
          <p className="project__text project__text_center">Back-end</p>
          <p className="project__text project__text_center">Front-end</p>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;