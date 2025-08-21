import React, { useContext } from "react";
import { MyContext } from "../createContext/CreateContext";

function ShowMovieList() {
  const { movieData, error, watchlist, setWatchList } = useContext(MyContext);
  const AddMovies = (movie) => {
    const exist = watchlist.some((movies) => movies.imdbID === movie.imdbID);
    if (!exist) {
      setWatchList((prev) => [...prev, movie]);
    }
  };
  console.log(movieData);

  return (
    <>
      <section className="flex flex-col min-w-full items-center w-auto shadow mt-4 justify-center gap-5">
        {error && (
          <span className="flex items-center justify-center h-full text-red-500">
            {error}
          </span>
        )}
        {movieData &&
          movieData.map((getMovie) => {
            return (
              <div
                key={getMovie.imdbID}
                className="flex mt-4 text-center bg-gray-100 w-[30vw] h-90 shadow-2xl rounded p-3 justify-center items-center"
              >
                <div className="w-1/2">
                  <h2 className="text-2xl font-bold">{getMovie.Title}</h2>
                  <img
                    src={getMovie.Poster}
                    alt={getMovie.Title}
                    className="mx-auto mt-2 w-[180px] h-[230px] rounded shadow"
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <button
                    onClick={() => AddMovies(getMovie)}
                    className="bg-green-600 py-2 px-3 rounded"
                    disabled={watchlist.some(
                      (e) => e.imdbID === getMovie.imdbID
                    )}
                  >
                    Add to WatchList
                  </button>
                  <div className="flex text-[0.6rem]">
                  <p >{getMovie.Year}</p>,
                  <p>{getMovie.Genre}</p>
                  </div>
                  <p>{getMovie.Plot}</p>
                  <p className="font-medium text-[0.5rem]">{getMovie.Actors}</p>
                  <h6 className="text-gray-400">
                    IMDB: {getMovie.Ratings?.[0]?.Value || "N/A"}
                  </h6>
                </div>
              </div>
            );
          })}
      </section>
    </>
  );
}

export default ShowMovieList;
