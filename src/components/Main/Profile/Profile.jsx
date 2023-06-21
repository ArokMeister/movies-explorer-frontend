import Form from "../../authorize/Form/Form";
import { NavLink } from "react-router-dom";

import "./Profile.css";

function Profile({ currentUser, onUpdate, onLogout }) {

  // const [values, setValues] = useState({ name: '', email: '' })
  // function onChange(evt) {
  //   setValues({ ...values, [evt.target.name]: evt.target.value })
  // }

  // function submit() {
  //   onUpdate(values.name, values.email)
  //   setValues({ name: '', email: '' })
  // }

  return (
    <section className="profile">
      <div className="profile__container">
        <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
        <Form currentUser={currentUser} btnText="Редактировать"/>
        <NavLink className="profile__exit" to="/" onClick={onLogout}>Выйти из аккаунта</NavLink>
      </div>
    </section>
  )
}

export default Profile;