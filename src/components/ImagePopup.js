import React from 'react';

function ImagePopup(props) {
    return (
        <div onClick={props.onCloseOverlay} className={`popup popup_type_zoom ${props.card.isOpen ? "popup_opened" : ""}`}>
            <figure className="popup__figure">
                <button onClick={props.onClose} aria-label="Закрыть" className="popup__close-button popup__close-button_zoom" type="button"></button>
                <img src={props.card.link} alt={props.card.name} className="popup__image" />
                <figcaption className="popup__description">{props.card.name}</figcaption>
            </figure>
        </div>
    )
}

export default ImagePopup;