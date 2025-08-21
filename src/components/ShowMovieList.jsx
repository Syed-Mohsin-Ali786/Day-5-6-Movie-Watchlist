import React, { useContext, useState } from "react";
import { MyContext } from "../createContext/CreateContext";
import SearchMovies from "./SearchMovies";
import WatchList from "./WatchList";

function ShowMovieList() {
  const { movieData, error, watchlist, setWatchList } = useContext(MyContext);
  const [addedMovieId, setAddedMovieId] = useState(null);

  const AddMovies = (movie) => {
    const exist = watchlist.some((movies) => movies.imdbID === movie.imdbID);
    if (!exist) {
      setWatchList((prev) => [...prev, movie]);
      setAddedMovieId(movie.imdbID);

      // Reset the added movie indicator after 2 seconds
      setTimeout(() => {
        setAddedMovieId(null);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-8 px-4">
      <div className="container mx-auto">

        {/* search Section */}
        <SearchMovies />
        {error && (
          <div className="flex items-center justify-center h-64 text-red-400 text-xl">
            <i className="fas fa-exclamation-circle mr-3"></i>
            <span>{error}</span>
          </div>
        )}

        {addedMovieId && (
          <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center">
            <i className="fas fa-check-circle mr-2"></i>
            Movie added to Watchlist!
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movieData &&
            movieData.map((getMovie) => {
              const isInWatchlist = watchlist.some(
                (movie) => movie.imdbID === getMovie.imdbID
              );

              return (
                <div
                  key={getMovie.imdbID}
                  className="movie-card bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative">
                    <img
                      src={getMovie.Poster}
                      alt={getMovie.Title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-0 left-0 bg-blue-500 text-white text-sm font-bold px-3 py-1">
                      {getMovie.Year}
                    </div>
                  </div>

                  <div className="p-5">
                    <h2 className="text-xl font-bold mb-2 line-clamp-1">
                      {getMovie.Title}
                    </h2>

                    <div className="flex items-center text-sm text-gray-400 mb-3">
                      <span>{getMovie.Genre}</span>
                      <span className="ml-auto flex items-center">
                        <i className="fas fa-star text-yellow-400 mr-1"></i>
                        ⭐{getMovie.Ratings?.[0]?.Value || "N/A"}
                      </span>
                    </div>

                    <p className="text-gray-300 mb-4 text-sm line-clamp-3">
                      {getMovie.Plot}
                    </p>

                    <p className="text-xs text-gray-400 mb-4">
                      <i className="fas fa-users mr-1"></i> {getMovie.Actors}
                    </p>

                    <button
                      onClick={() => AddMovies(getMovie)}
                      className={`w-full py-2 px-4 rounded-lg font-semibold flex items-center justify-center transition-all duration-200 ${
                        isInWatchlist
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                      }`}
                      disabled={isInWatchlist}
                    >
                      {isInWatchlist ? (
                        <>
                          <i className="fas fa-check mr-2"></i> In Watchlist
                        </>
                      ) : (
                        <>
                          <i className="fas fa-plus mr-2"></i> Add to Watchlist
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
        </div>

        {movieData && movieData.length === 0 && !error && (
          <div className="flex flex-col items-center justify-center h-96 text-gray-400">
            <i className="fas fa-film text-5xl mb-4"></i>
            <p className="text-xl">No movies found</p>
            <p className="mt-2">Try searching for something else</p>
          </div>
        )}
      </div>
   <WatchList/>
      <style jsx>{`
        .movie-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default ShowMovieList;
