import React from 'react';

import PopupWithForm from './PopupWithForm';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onCloseOverlay={props.onCloseOverlay}
            onSubmit={handleSubmit}
            onClose={props.onClose}
            name="edit"
            title="Редактировать профиль"
            buttonTitle="Сохранить"
        >
            <input className="popup__input popup__input_type-name"
                required
                value={name || ''}
                onChange={handleNameChange}
                minLength='2'
                maxLength='40'
                type="text"
                name="name"
                id="name" />
            <span className="popup__input-error name-error"></span>
            <input className="popup__input popup__input_type-description"
                required
                value={description || ''}
                onChange={handleDescriptionChange}
                minLength='2'
                maxLength='400'
                type="text"
                name="about"
                id="about" />
            <span className="popup__input-error about-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;