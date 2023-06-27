import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

import "./MoviesCardList.css";

function MoviesCardList({ moviesList, isLiked, isLoading, addFavoritMovies, deleteFavoritMovies, savedMoviesList }) {
  
  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <ul className="movies__list container">
          {moviesList.map(item => (
            <MoviesCard 
              key={item.id || item._id}
              movie={item}
              isLiked={isLiked}
              isLoading={isLoading}
              addFavoritMovies={addFavoritMovies}
              deleteFavoritMovies={deleteFavoritMovies}
              savedMoviesList={savedMoviesList}
            />
          ))}
        </ul>
      )}
    </>
    
  )
}

export default MoviesCardList;