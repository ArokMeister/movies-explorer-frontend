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