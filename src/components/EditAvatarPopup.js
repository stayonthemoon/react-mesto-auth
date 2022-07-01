import React from 'react';

import PopupWithForm from './PopupWithForm';


function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({ avatar: avatarRef.current.value });
        avatarRef.current.value = ''
    };

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onCloseOverlay={props.onCloseOverlay}
            onSubmit={handleSubmit}
            onClose={props.onClose}
            name="avatar"
            title="Обновить аватар"
            buttonTitle="Сохранить"
        >
            <input className="popup__input popup__input_type_avatar"
                ref={avatarRef}
                required
                type="url"
                name="avatar"
                id="avatar"
                placeholder="Ссылка на аватар"
            />
            <span className="popup__input-error popup__input-error_avatar avatar-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;