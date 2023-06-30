import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../Form/Form';
import logo from '../../../images/logo.svg'

import "./Login.css"

function Login ({ goLanding, onLogin, loggedIn }) {

  const navigate = useNavigate();

  const [values, setValues] = useState({ email: '', password: '' })
  
  function onChange(evt) {
    setValues({ ...values, [evt.target.name]: evt.target.value })
  }

  function submit() {
    onLogin(values.email, values.password)
    setValues({ email: '', password: '' })
  }

  useEffect(() => {
    if (loggedIn) {
      navigate("/movies", { replace: true })
    }
  })

  return (
    <section className="login">
      <div className="login__container">
        <img className="login__logo" src={logo} alt="Логотип приложения" onClick={goLanding} />
        <h1 className="login__title">Рады видеть!</h1>
        <Form onSubmit={submit} onChange={onChange} btnText="Войти"/>
        <p className="login__subtitle">Еще не зарегистрированы? <Link className="login__link" to="/signup">Регистрация</Link></p>
      </div>
    </section>
  )
}

export default Login;