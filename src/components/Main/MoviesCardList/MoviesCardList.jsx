import MoviesCard from "../MoviesCard/MoviesCard";

import "./MoviesCardList.css";

function MoviesCardList({ render, isLoading }) {

  const movies = render()
  return (
    <>
      <ul className="movies__list container">
        {movies.map(item => (
          <MoviesCard 
            key={item.id}
            movie={item}
            isLoading={isLoading}
          />
        ))}
      </ul>
      <button className="movies__button" type="button">Ещё</button>
    </>
    
  )
}

export default MoviesCardList;