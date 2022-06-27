export const base_URL = 'https://auth.nomoreparties.co';

export const _handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const registration = (email, password) => {
    return fetch(`${base_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            password,
            email,
        })
    })
        .then(_handleResponse)
};

export const authorization = (email, password) => {
    return fetch(`${base_URL}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            password,
            email,
        })
    })
        .then(_handleResponse)
}

export const verification = (token) => {
    return fetch(`${base_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then(_handleResponse)
};


