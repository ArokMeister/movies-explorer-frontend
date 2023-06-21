import MoviesCard from "../MoviesCard/MoviesCard";

import "./MoviesCardList.css";

function MoviesCardList({ render }) {

  const movies = render()
  return (
    <ul className="movies__list container">
      {movies.map(item => (
          <MoviesCard 
            key={item.id}
            movie={item}
          />
      ))}
    </ul>
  )
}

export default MoviesCardList;