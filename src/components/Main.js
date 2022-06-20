import React from 'react';

import Card from './Card';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="page">
            <section className="profile">

                <div onClick={props.onEditAvatar} className="profile__avatar-wrapper">
                    <button onClick={props.onEditAvatar} className="profile__avatar-button" type="button"></button>
                    <img onClick={props.onEditAvatar} alt="Аватар" className="profile__avatar" src={currentUser.avatar} />
                </div>

                <div className="profile__info">
                    <div className="profile__wrapper">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button onClick={props.onEditProfile} aria-label="Редактировать профиль" className="profile__edit-button" type="button"></button>
                    </div>
                    <p className="profile__description">{currentUser.about}</p>
                </div>

                <button onClick={props.onAddPlace} aria-label="Добавить информацию" className="profile__add-button" type="button"></button>
            </section>

            <section className="elements">
                <ul className="element">
                    {props.cards.map((card) => (
                        <Card key={card._id}
                            card={card}
                            onImagePopup={props.onCardClick}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete}
                        />
                    ))
                    }
                </ul>
            </section>
        </main>
    );
}

export default Main;
