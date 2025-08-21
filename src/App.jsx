import { useContext, useEffect } from "react";
import "./App.css";
import SearchMovies from "./components/SearchMovies";
import { MyContext } from "./createContext/CreateContext";
function App() {
  const { movieData, error, watchlist, setWatchList } = useContext(MyContext);

  const AddMovies = (id) => {
    const exist = watchlist.some((movies) => movies.imdbID === id);
    if (!exist || watchlist.length > 1) {
      setWatchList((prev) => [...prev, movieData]);
    } else {
      console.log("Already Exist");
    }
    console.log(watchlist);
  };

  useEffect(() => {
    if (watchlist.length > 0) {
      console.log("Updated Watchlist:", watchlist);
    }
  }, [watchlist]); // runs whenever watchlist changes

  return (
    <>
      <div className="flex flex-col justify-center items-center my-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          Movies Watchist
        </h1>
        {/* search Section */}
        <SearchMovies />
        {/* Movies List Section */}
        <section className="flex  h-98 min-w-full items-center w-auto shadow mt-4 justify-center gap-5">
          {error && (
            <span className="flex items-center justify-center h-full text-red-500">
              {error}
            </span>
          )}
          {movieData &&
            movieData.map((movies) => {
              return (
                <div
                  key={movies.imdbID}
                  className="flex flex-col mt-4 text-center bg-gray-700 w-60 h-90 shadow rounded p-3 justify-center items-center"
                >
                  <img
                    src={movies.Poster}
                    alt={movies.Title}
                    className="mx-auto mt-2 w-[180px] h-[210px] rounded shadow"
                  />
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-bold">{movies.Title}</h2>
                    <p className="text-[0.4rem]">{movies.Released}</p>
                    <p className="font-medium text-[0.5rem]">{movies.Actors}</p>
                    <h6 className="text-gray-400">
                      IMDB: {movies.Ratings?.[0]?.Value || "N/A"}
                    </h6>
                    <button
                      onClick={() => AddMovies(movies.imdbID)}
                      className="bg-green-600 py-2 px-3 rounded"
                    >
                      Add to WatchList
                    </button>
                  </div>
                </div>
              );
            })}
        </section>
        <section className="h-full w-fit">
          <h1 className="text-6xl">WatchList</h1>
          {watchlist &&
            watchlist.map((movie) => {
              return (
                <div
                  key={movie.imdbID}
                  className="flex flex-col mt-4 text-center bg-gray-700 w-60 h-90 shadow rounded p-3 justify-center items-center"
                >
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="mx-auto mt-2 w-[180px] h-[210px] rounded shadow"
                  />
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-bold">{movie.Title}</h2>
                    <p className="text-[0.4rem]">{movie.Released}</p>
                    <p className="font-medium text-[0.5rem]">{movie.Actors}</p>
                    <h6 className="text-gray-400">
                      IMDB: {movie.Ratings?.[0]?.Value || "N/A"}
                    </h6>
                    <button
                      className="py-2 px-3 bg-red-300 rounded w-fit mt-4"
                      onClick={() => {
                        const newWatchList = watchlist.filter(
                          (existing) => existing.imdbID !== movie.imdbID
                        );
                        setWatchList(newWatchList);
                      }}
                    >
                      Remove from watchlist
                    </button>
                  </div>
                </div>
              );
            })}
        </section>
      </div>
    </>
  );
}

export default App;
