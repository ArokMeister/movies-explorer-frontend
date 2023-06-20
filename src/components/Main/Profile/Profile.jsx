import { useState } from "react";
import Form from "../../authorize/Form/Form";


function Profile({ currentUser, onUpdate }) {

  const [values, setValues] = useState({ name: '', email: '' })
  console.log(currentUser)
  function onChange(evt) {
    setValues({ ...values, [evt.target.name]: evt.target.value })
  }

  function submit() {
    onUpdate(values.name, values.email)
    setValues({ name: '', email: '' })
  }

  return (
    <section className="profile">
      <div className="profile__container">
        <h1 className="profile__title">{`Привет, ${currentUser}!`}</h1>
        <Form onSubmit={submit} onChange={onChange} values={values} btnText="Редактировать"/>
        <button className="profile__button-exit">Выйти из аккаунта</button>
      </div>
    </section>
  )
}

export default Profile;