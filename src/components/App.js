import React from 'react';

import {
  Route,
  Switch,
  useLocation,
  useHistory,
} from 'react-router-dom';

import Register from './Register'
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

import { api } from '../utils/Api';
import * as Auth from '../utils/Auth';

import { CurrentUserContext } from '../contexts/CurrentUserContext';


function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    name: "",
    link: ""
  });

  const [isRespondMessagePopupOpen, setIsRespondMessagePopupOpen] = React.useState({
    isOpen: false,
    isRespond: false,
    isRespondMessage: '',
  })

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [userData, setUserData] = React.useState();
  const [loggedIn, setLoggedIn] = React.useState(false);

  const history = useHistory();
  const location = useLocation();

  function checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
      Auth.verification(token)
        .then((res) => {
          if (res) {
            let userData = {
              email: res.data.email,
            };
            setLoggedIn(true);
            setUserData(userData);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  React.useEffect(() => {
    checkToken();
  },
    []);

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  },
    [loggedIn, history]);

  const handleRegistration = ({ email, password }) => {
    return Auth.registration(email, password)
      .then(() => {
        setIsRespondMessagePopupOpen({
          isOpen: true,
          isRespond: true,
          isRespondMessage: 'Вы успешно зарегистрировались!',
        });
        history.push('/sing-in');
      })
      .catch((err) => {
        console.log(err);
        setIsRespondMessagePopupOpen({
          isOpen: true,
          isRespond: false,
          isRespondMessage: err,
        });
      });
  };

  const handleAuthorization = ({ email, password }) => {
    return Auth.authorization(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          checkToken();
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
        setIsRespondMessagePopupOpen({
          isOpen: true,
          isRespond: false,
          isRespondMessage: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
      });
  };

  function handleLogout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserData(null);
    history.push('/sign-in');
  }

  function toLogin() {
    history.push('/sign-in');
  }
  function toRegistration() {
    history.push('/sign-up');
  }

  React.useEffect(() => {
    if (loggedIn) {
      api.getInitialCards()
        .then((cards) => {
          setCards(cards)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
    [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      api.getProfileInfo()
        .then((data) => {
          setCurrentUser(data)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
    [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleCardDelete = (card) => {
    api.deleteConfirmCard(card._id)
      .then(() => {
        setCards(cards.filter(item => item._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // open popups

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({
      isOpen: true,
      name: card.name,
      link: card.link
    })
  }

  function handleUpdateUser({ name, about }) {
    api.editProfile(name, about)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api.updateAvatar(avatar)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // close popups

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({
      isOpen: false,
      name: " ",
      link: " "
    });
    setIsRespondMessagePopupOpen({
      isOpen: false,
      isRespond: false,
      isRespondMessage: " "
    })
  }

  function closePopupOverlay(event) {
    if (event.target === event.currentTarget) {
      closeAllPopups();
    }
  }

  return (
    <div className="root">
      <div className="wrapper">

        <CurrentUserContext.Provider value={currentUser}>
          <Header
            userData={userData}
            information={
              location.pathname === '/sign-in' ? 'Регистрация'
                :
                location.pathname === '/sign-up' ? 'Войти'
                  :
                  'Выйти'
            }
            onHeaderClick={
              location.pathname === '/' ? handleLogout
                :
                location.pathname === '/sign-in' ? toRegistration
                  :
                  toLogin
            }
          />

          <Switch>
            <ProtectedRoute
              exact path='/'
              loggedIn={loggedIn}
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Route path='/sign-up'>
              <Register handleRegistration={handleRegistration} />
            </Route>
            <Route path='/sign-in'>
              <Login handleAuthorization={handleAuthorization} />
            </Route>
          </Switch>

          <InfoTooltip
            isOpen={isRespondMessagePopupOpen.isOpen}
            onClose={closeAllPopups}
            onCloseOverlay={closePopupOverlay}
            isRespond={isRespondMessagePopupOpen.isRespond}
            isRespondMessage={isRespondMessagePopupOpen.isRespondMessage}
          />

          {/*           <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          /> */}

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onCloseOverlay={closePopupOverlay}
            onUpdateUser={handleUpdateUser} />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onCloseOverlay={closePopupOverlay}
            onUpdateAvatar={handleUpdateAvatar} />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onCloseOverlay={closePopupOverlay}
            onAddPlace={handleAddPlaceSubmit} />

          <PopupWithForm
            name="delete"
            title="Вы уверены?"
            buttontitle="Да"
          >
          </PopupWithForm>

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            onCloseOverlay={closePopupOverlay}
          />

          <Footer />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}
export default App;