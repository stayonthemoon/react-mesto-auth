import React from 'react';

function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`} onClick={props.onCloseOverlay}>
            <div className="popup__wrapper">

                <button onClick={props.onClose} aria-label="Закрыть" type="button" className="popup__close-button"></button>

                <form onSubmit={props.onSubmit} name={`${props.name}`} className="popup__form popup__form-edit-profile" noValidate>

                    <h2 className="popup__title">{props.title}</h2>

                    {props.children}

                    <button aria-label="Сохранить" type="submit" className="popup__save-button">{props.buttonTitle}</button>

                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;