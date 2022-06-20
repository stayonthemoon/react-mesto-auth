import React from 'react';

import PopupWithForm from './PopupWithForm';


function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    /* 
    Из-за этого рефа не работает отправка формы по аватарке. Когда убираю - всё работает. Не могу найти причину. Ниже эксперименты. 
 
    React.useEffect(() => {
         avatarRef.current.value = '';
     }, [props.isOpen]); 

   const [avatar, setAvatar] = React.useState('');
    React.useEffect(() => {
        setAvatar('');
    }, [props.isOpen]); 

   function handleAvatarChange(e) {
        setAvatar(e.target.value);
    } 

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    } */

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({ avatar: avatarRef.current.value });
        avatarRef.current.value = ''
    };

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            onCloseOverlay={props.onCloseOverlay}
            onSubmit={handleSubmit}
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
            /* value={avatar || ''}
            onChange={handleAvatarChange} */
            />
            <span className="popup__input-error popup__input-error_avatar avatar-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;