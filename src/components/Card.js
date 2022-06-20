import React from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUser._id;

    const cardDeleteButtonClassName = (
        `element__delete-button ${isOwn ? 'element__delete-button' : 'element__delete-button_hidden'}`
    );

    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `element__like-button ${isLiked ? 'element__like-button_active' : 'element__like-button'}`
    );

    function handleClick() {
        props.onImagePopup(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }


    return (
        <li className="element__card">
            <button type="button" onClick={handleDeleteClick} className={cardDeleteButtonClassName}></button>
            <img onClick={handleClick} src={props.card.link} alt={props.card.name} className="element__image" />
            <div className="element__wrapper">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__like-container">
                    <button onClick={handleLikeClick} aria-label="Поставить лайк" className={cardLikeButtonClassName} type="button"></button>
                    <span className="element__like-counter">{props.card.likes.length}</span>
                </div>
            </div>
        </li>
    )
}

export default Card;
