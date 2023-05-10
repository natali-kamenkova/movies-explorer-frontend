class MainApi {
    constructor({baseUrl}) {
        this._baseUrl = baseUrl;
    }

    _checkServerResponseStatus = res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    };

}

export const mainApi = new MainApi({
    baseUrl: "https://api.natali.nomoredomains.monster",
});
