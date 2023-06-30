import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../Form/Form';
import logo from '../../../images/logo.svg'

import "./Register.css"

function Register ({ goLanding, onRegister, loggedIn, isSubmiting }) {

  const navigate = useNavigate();

  const [values, setValues] = useState({ name: '', email: '', password: '' })

  function onChange(evt) {
    setValues({ ...values, [evt.target.name]: evt.target.value })
  }

  async function submit() {
    await onRegister(values.name, values.email, values.password)
    setValues({ name: '', email: '', password: '' })
  }

  useEffect(() => {
    if (loggedIn) {
      navigate("/movies", { replace: true })
    }
  })

  return (
    <section className="register">
      <div className="register__container">
        <img className="register__logo" src={logo} alt="Логотип приложения" onClick={goLanding}/>
        <h1 className="register__title">Добро пожаловать!</h1>
        <Form onSubmit={submit} onChange={onChange} values={values} btnText="Зарегистрироваться" isSubmiting={isSubmiting} />
        <p className="register__subtitle">Уже зарегистрированы? <Link className="register__link" to="/signin">Войти</Link></p>
      </div>
    </section>
  )
}

export default Register;