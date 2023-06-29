import MoviesCard from "../MoviesCard/MoviesCard";

import "./MoviesCardList.css";

function MoviesCardList({ moviesList, addFavoritMovies, deleteFavoritMovies, deleteBeatMovies, savedMoviesList, isLoading }) {


  const movies = moviesList.map(movie => {
    const isSaved = savedMoviesList?.some(savedMovie => savedMovie.movieId === movie.id || savedMovie.movieId === movie._id);

    return (
      <li key={movie.id || movie._id}>
        <MoviesCard 
          movie={movie} 
          isSaved={isSaved} 
          deleteFavoritMovies={deleteFavoritMovies}
          deleteBeatMovies={deleteBeatMovies}
          addFavoritMovies={addFavoritMovies}
          isLoading={isLoading}
        />
      </li>
    );
  });

  return (
    <ul className="movies__list container">{movies}</ul>
  )
}

export default MoviesCardList;