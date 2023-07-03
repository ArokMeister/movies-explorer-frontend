class MoviesApi {
  constructor() {
    this._baseURL = 'https://api.nomoreparties.co/beatfilm-movies';
    this._headers = { 'Accept': 'application/json',
    'Content-Type': 'application/json' };
    this._credentials = 'include';
  }

  _verifyResponse(res) {
    if (!res.ok) {
      return res.json().then(message => {throw new Error(message.message)})
    }
    return res.json();
  }

  getMoviesData() {
    return fetch(`${this._baseURL}`)
      .then(res => this._verifyResponse(res));
  }
}

const movies = new MoviesApi();

export default movies;