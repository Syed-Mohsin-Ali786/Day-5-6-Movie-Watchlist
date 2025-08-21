import React, { useContext, useEffect } from "react";
import { MyContext } from "../createContext/CreateContext";

function WatchList() {
  const { watchlist, setWatchList } = useContext(MyContext);
  useEffect(() => {
    localStorage.setItem("WatchList", JSON.stringify(watchlist));
  }, [watchlist]);
  return (
    <>
      <section className="h-full w-fit flex gap-4">
        {watchlist &&
          watchlist.map((watchlistMovie) => {
            return (
              <div
                key={watchlistMovie.imdbID}
                className="flex flex-col mt-4 text-center bg-gray-700 w-60 h-90 shadow rounded p-3 justify-center items-center"
              >
                <img
                  src={watchlistMovie.Poster}
                  alt={watchlistMovie.Title}
                  className="mx-auto mt-2 w-[180px] h-[210px] rounded shadow"
                />
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold">{watchlistMovie.Title}</h2>
                  <p className="text-[0.4rem]">{watchlistMovie.Released}</p>
                  <p className="font-medium text-[0.5rem]">
                    {watchlistMovie.Actors}
                  </p>
                  <h6 className="text-gray-400">
                    IMDB: {watchlistMovie.Ratings?.[0]?.Value || "N/A"}
                  </h6>
                  <button
                    className="py-2 px-3 bg-red-300 rounded w-fit mt-4"
                    onClick={() => {
                      const newWatchList = watchlist.filter(
                        (existing) => existing.imdbID !== watchlistMovie.imdbID
                      );
                      setWatchList(newWatchList);
                      //   localStorage.setItem(
                      //     "WatchList",
                      //     JSON.stringify(newWatchList)
                      //   );
                    }}
                  >
                    Remove from watchlist
                  </button>
                </div>
              </div>
            );
          })}
      </section>
    </>
  );
}

export default WatchList;
