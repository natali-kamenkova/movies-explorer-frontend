class MoviesApi {
    constructor({baseUrl}) {
        this._baseUrl = baseUrl;
    }

    _checkServerResponseStatus = res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    };

    getBeatfilmMovies = () => fetch(`${this._baseUrl}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(this._checkServerResponseStatus);
}

export const moviesApi = new MoviesApi({baseUrl: "https://api.nomoreparties.co/beatfilm-movies",});
