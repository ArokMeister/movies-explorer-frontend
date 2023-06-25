import MoviesCard from "../MoviesCard/MoviesCard";

import "./MoviesCardList.css";

function MoviesCardList({ moviesList, isLoading, addFavoritMovies }) {

  return (
    <>
      <ul className="movies__list container">
        {moviesList.map(item => (
          <MoviesCard 
            key={item.id || item._id}
            movie={item}
            isLoading={isLoading}
            addFavoritMovies={addFavoritMovies}
          />
        ))}
      </ul>
    </>
    
  )
}

export default MoviesCardList;