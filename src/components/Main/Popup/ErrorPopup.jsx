import './ErrorPopup.css'

function ErrorPopup({ error, onClose }) {
  return (
    <div className={`popup ${error.isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose} />
        <h2 className="popup__title">{`Хьюстон! ${error.isSucces ? "Полет нормальный!" : "У нас проблема!"} 👇`}</h2>
        <span className={`popup__error-text ${error.isSucces ? "succes" : ''} `}>{`${error.errorMessage}`}</span>
      </div>
    </div>
  )
}

export default ErrorPopup