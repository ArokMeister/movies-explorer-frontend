import { useState, useEffect, useCallback, useContext } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import { NavLink } from "react-router-dom";
import Form from "../../authorize/Form/Form";

import "./Profile.css";

function Profile({ updateUser, onLogout, isSubmiting }) {

  const currentUser = useContext(CurrentUserContext)

  const [values, setValues] = useState({ name: currentUser.name, email: currentUser.email })
  const [buttonState, setButtonState] = useState(false)
  const [inputState, setInputState] = useState(true)
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true)

  const checkDataUser = useCallback(() => {
    if (values.name === currentUser.name && values.email === currentUser.email) {
      setIsSaveButtonDisabled(true)
    } else {
      setIsSaveButtonDisabled(false)
    }
  }, [currentUser.email, currentUser.name, values.email, values.name])

  const toggleInput = () => {
    setInputState(!inputState)
    setButtonState(!buttonState)
  }

  const onChange = (evt) => {
    setValues({ ...values, [evt.target.name]: evt.target.value })
  }

  async function submit(evt) {
    evt.preventDefault()
    await updateUser(values.name, values.email)
    toggleInput()
  }

  useEffect(() => {
    checkDataUser();
  }, [checkDataUser, values.name, values.email]);

  useEffect(() => {
    setValues({ name: currentUser.name, email: currentUser.email });
  }, [currentUser.name, currentUser.email]);

  return (
    <main className="profile">
      <div className="profile__container">
        <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
        <Form 
          btnText="Редактировать" 
          onClick={toggleInput} 
          inputState={inputState} 
          buttonState={buttonState} 
          onChange={onChange} 
          onSubmit={submit} 
          values={values} 
          saveButtonState={isSaveButtonDisabled}
          isSubmiting={isSubmiting}
        />
        <NavLink className="profile__exit" to="/" onClick={onLogout}>Выйти из аккаунта</NavLink>
      </div>
    </main>
  )
}

export default Profile;