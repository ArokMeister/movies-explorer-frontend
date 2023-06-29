import { useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

import "./MoviesCardList.css";

function MoviesCardList({ moviesList, addFavoritMovies, deleteFavoritMovies, deleteBeatMovies, savedMoviesList }) {
  console.log(savedMoviesList)
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
        />
      </li>
    );
  });

  return (
    <ul className="movies__list container">{movies}</ul>
  )
}

export default MoviesCardList;
    

//   return (
//     <>
//       {isLoading ? (
//         <Preloader />
//       ) : (
//         <ul className="movies__list container">
//           {moviesList.map(item => (
//             <MoviesCard 
//               key={item.id || item._id}
//               movie={item}
//               isLiked={isLiked}
//               isLoading={isLoading}
//               onButtonClick={isSaved ? deleteFavoritMovies : addFavoritMovies}
//               addFavoritMovies={addFavoritMovies}
//               deleteFavoritMovies={deleteFavoritMovies}
//               savedMoviesList={savedMoviesList}
//               isAddFavorit={isAddFavorit}
//               isSavedMovie={isSaved}
//             />
//           ))}
//         </ul>
//       )}
//     </>
    
//   )
// }

// export default MoviesCardList;