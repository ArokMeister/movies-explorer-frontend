export const staticSite = "https://tatty13.github.io/kuda-go/";
export const adaptiveSite = "https://arokmeister.github.io/russian-travel/";
export const singlePageApplication = "https://arokmeister.mesto.nomoredomains.monster/signin";
export const imageURLBeatFilms = "https://api.nomoreparties.co"

export function formatTime(minutes) {
  let hours = Math.floor(minutes / 60);
  let mins = minutes % 60;
  if (mins === 0) { 
    return `${hours}ч`;
  } else if (hours === 0) {
    return `${mins}м`;
  } else {
    return `${hours}ч ${mins}м`
  }
}
