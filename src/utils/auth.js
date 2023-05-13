class Auth {
    constructor({baseUrl}) {
        this._baseUrl = baseUrl;
    }

    _checkServerResponseStatus(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    register(name, email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: `${name}`,
                email: `${email}`,
                password: `${password}`,
            }),
        }).then(this._checkServerResponseStatus);
    }

    login(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: `${email}`,
                password: `${password}`,
            }),
        }).then(this._checkServerResponseStatus);
    }

    checkToken(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        }).then(this._checkServerResponseStatus);
    }
}

export const auth = new Auth({
    baseUrl: "https://api.natali.nomoredomains.monster",
});