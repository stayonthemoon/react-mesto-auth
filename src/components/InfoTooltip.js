import React from 'react';

import ok from '../images/auth/ok-icon.svg'
import fail from '../images/auth/fail-icon.svg'

function InfoTooltip(props) {
    return (
        <div
            className={`popup popup_type_infotooltip ${props.isOpen ? "popup_opened" : ""}`}
            onClick={props.onCloseOverlay}>
            <div className='popup__wrapper popup__wrapper_infotooltip'>
                <button onClick={props.onClose} aria-label="Закрыть" type="button" className="popup__close-button"></button>
                <img
                    className='popup__res-image'
                    alt='Итог регистрации'
                    src={props.isRespond ? ok : fail}
                />
                <h2 className="popup__title-res">{props.isRespondMessage}</h2>
            </div>

        </div >
    )
}

export default InfoTooltip;