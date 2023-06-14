function Techs () {
  return (
    <section className="techs" id="#techs">
      <div className="techs__container_title">
        <h2 className="techs__title">Технологии</h2>
        <span className="techs__line" />
      </div>
      <div className="techs__container_subtitle">
        <h3 className="techs__subtitle">7 технологий</h3>
        <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      </div>
      <ul className="techs__list">
        <li className="techs__list_item">HTML</li>
        <li className="techs__list_item">CSS</li>
        <li className="techs__list_item">JS</li>
        <li className="techs__list_item">React</li>
        <li className="techs__list_item">Git</li>
        <li className="techs__list_item">Express.js</li>
        <li className="techs__list_item">mongoDB</li>
      </ul>
    </section>
  )
}

export default Techs;