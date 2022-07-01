import React from 'react';

import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handlePlaceChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name,
            link,
        });
    }

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen]);

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onCloseOverlay={props.onCloseOverlay}
            onSubmit={handleSubmit}
            onClose={props.onClose}
            name="addcard"
            title="Новое место"
            buttonTitle="Создать"
        >
            <input className="popup__input popup__input_type_place"
                required
                value={name || ''}
                onChange={handlePlaceChange}
                minLength='2'
                maxLength='30'
                type="text"
                name="place"
                id="place"
                placeholder="Название места"
            />
            <span className="popup__input-error place-error">
            </span>
            <input className="popup__input popup__input_type_link"
                required
                value={link || ''}
                onChange={handleLinkChange}
                type="url"
                name="link"
                id="link"
                placeholder="Ссылка на картинку"
            />
            <span className="popup__input-error link-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;