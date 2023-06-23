import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

import "./Form.css";

function Form ({ onSubmit, onChange, btnText, values, currentUser }) {

  const { register, formState: { errors }, handleSubmit } = useForm({ mode: "onChange" })

  const location = useLocation();
  
  if (location.pathname === "/signup") {
    return (
      <div className="form__container">
        <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate >
          <label className="form__label">Имя</label>
          <input
            className="form__input"
            type='text'
            name='name'
            id='name'
            autoComplete='off'
            style={errors.name ? {color: "#FF3055"} : {color: "#000"}}
            value={`Username`}
            {...register("name", {
              required: "Обязательное поле",
              minLength: {
                value: 2,
                message: "Минимум 2 символа"
              },
              onChange: onChange
            })}
          />
          <span className="form__error">{errors?.name?.message}</span>
          <label className="form__label">E-mail</label>
          <input
            className="form__input"
            type='email'
            name='email'
            id='email'
            autoComplete='off'
            style={errors.email ? {color: "#FF3055"} : {color: "#000"}}
            value={`test@test.ru`}
            {...register("email", {
              required: "Обязательное поле",
              pattern: {
                value: (/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu),
                message: "Введите E-mail"
              },
              onChange: onChange
            })}
          />
          <span className="form__error">{errors?.email?.message}</span>
          <label className="form__label">Пароль</label>
          <input
            className="form__input"
            type='password'
            name='password'
            id='password'
            autoComplete='off'
            style={errors.password ? {color: "#FF3055"} : {color: "#FF3055"}}
            value={"password"}
            {...register("password", {
              required: "Обязательное поле",
              minLength: {
                value: 6,
                message: "Минимум 6 символов"
              },
              onChange: onChange
            })}
          />
          <span className="form__error">Что-то пошло не так...</span>
          <button className="form__btn" >{btnText}</button>
        </form>
      </div>
    )
  }
  if (location.pathname === "/signin") {
    return (
      <div className="form__container">
        <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <label className="form__label">E-mail</label>
          <input
            className="form__input"
            type='email'
            name='email'
            id='email'
            autoComplete='off'
            style={errors.email ? {color: "#FF3055"} : {color: "#000"}}
            value={values}
            {...register("email", {
              required: "Обязательное поле",
              pattern: {
                value: (/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu),
                message: "Введите E-mail"
              },
              onChange: onChange
            })}
          />
          <span className="form__error">{errors?.email?.message}</span>
          <label className="form__label">Пароль</label>
          <input
            className="form__input"
            type='password'
            name='password'
            id='password'
            autoComplete='off'
            style={errors.password ? {color: "#FF3055"} : {color: "#000"}}
            value={values}
            {...register("password", {
              required: "Обязательное поле",
              minLength: {
                value: 6,
                message: "Минимум 6 символов"
              },
              onChange: onChange
            })}
          />
          <span className="form__error">{errors?.password?.message}</span>
          <button className="form__btn" >{btnText}</button>
        </form>
      </div>
    )
  }
  if (location.pathname === "/profile") {
    return (
      <div className="form__container">
        <form className="form form__profile" onSubmit={handleSubmit(onSubmit)} noValidate>
          <label className="form__label-profile">
            Имя
            <input
              className="form__input-profile"
              type='text'
              name='name'
              id='name'
              autoComplete='off'
              style={errors.name ? {color: "#FF3055"} : {color: "#000"}}
              value={currentUser.name}
              {...register("name", {
                required: "Обязательное поле",
                minLength: {
                  value: 2,
                  message: "Минимум 2 символа"
                },
                onChange: onChange
              })}
            />
          </label>
          <span className="form__line" />
          <label className="form__label-profile">
            E-mail
            <input
              className="form__input-profile"
              type='email'
              name='email'
              id='email'
              autoComplete='off'
              style={errors.email ? {color: "#FF3055"} : {color: "#000"}}
              value={currentUser.email}
              {...register("email", {
                required: "Обязательное поле",
                pattern: {
                  value: (/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu),
                  message: "Введите E-mail"
                },
                onChange: onChange
              })}
            />
          </label>
          <span className="form__error center">{errors?.message}</span>
          <button className="form__btn-profile">{btnText}</button>
        </form>
      </div>
    )
  }
}

export default Form;