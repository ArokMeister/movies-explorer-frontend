import { useNavigate } from "react-router-dom";

import "./NotFound.css";

function NotFound () {
  const navigate = useNavigate();

  const stepBack = () => navigate(-1)

  return (
    <div className="notfound__container">
      <h1 className="notfound__title">404</h1>
      <p className="notfount__subtitle">Страница не найдена</p>
      <button className="notfound__btn" onClick={stepBack}>Назад</button>
    </div>
  )
}

export default NotFound;