class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // 1. Загрузка информации о пользователе с сервера


  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._handleResponse)
  }

  // 2. Загрузка карточек с сервера

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._handleResponse)
  }

  // 3. Редактирование профиля

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._handleResponse)
  }

  // 4. Добавление новой карточки

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._handleResponse)
  }

  // 7. Удаление карточки

  deleteConfirmCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._handleResponse)
  }

  // 8. Постановка и снятие лайка

  changeLikeCardStatus(id, isLiked) {
    if (!isLiked) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then(this._handleResponse)

    } else {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
        .then(this._handleResponse)
    }
  }

  // 9. Обновление аватара пользователя

  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
      .then(this._handleResponse)
  };
}

export const api = new Api(
  {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40',
    headers: {
      authorization: '3891497c-3b33-469f-829f-cdedf96866f6',
      'Content-Type': 'application/json'
    }
  });
