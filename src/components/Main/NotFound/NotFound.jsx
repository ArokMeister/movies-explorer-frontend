import { useNavigate } from "react-router-dom";

import "./NotFound.css";

function NotFound () {
  const navigate = useNavigate();

  const goBack = () => navigate(-1)

  return (
    <main className="notfound">
      <h1 className="notfound__title">404</h1>
      <p className="notfount__subtitle">Страница не найдена</p>
      <button className="notfound__btn" onClick={goBack}>Назад</button>
    </main>
  )
}

export default NotFound;