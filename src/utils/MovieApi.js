class MovieApi {
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

  getMovieData() {
    return fetch(`${this._baseURL}`, {
      // headers: this._headers,
      // credentials: this._credentials
    })
      .then(res => this._verifyResponse(res));
  }
}

const movie = new MovieApi();

export default movie;