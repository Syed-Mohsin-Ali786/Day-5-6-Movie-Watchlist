import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../createContext/CreateContext";

function WatchList() {
  const { watchlist, setWatchList } = useContext(MyContext);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    localStorage.setItem("WatchList", JSON.stringify(watchlist));
  }, [watchlist]);

  const handleRemove = (imdbID) => {
    setRemovingId(imdbID);
    
    // Add a small delay to show the animation before removing
    setTimeout(() => {
      const newWatchList = watchlist.filter(
        (existing) => existing.imdbID !== imdbID
      );
      setWatchList(newWatchList);
      setRemovingId(null);
    }, 300);
  };

  if (watchlist.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-6 text-gray-400">
          <svg className="w-24 h-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-gray-300 mb-2">Your watchlist is empty</h3>
        <p className="text-gray-500 max-w-md">
          Start searching for movies and add them to your watchlist to see them here.
        </p>
      </div>
    );
  }

  return (
    <section className="p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-white">
        My Watchlist <span className="text-blue-400">({watchlist.length})</span>
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {watchlist.map((watchlistMovie) => (
          <div
            key={watchlistMovie.imdbID}
            className={`bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-105 ${
              removingId === watchlistMovie.imdbID ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            <div className="relative">
              <img
                src={watchlistMovie.Poster !== "N/A" ? watchlistMovie.Poster : "https://via.placeholder.com/300x450/333/fff?text=No+Image"}
                alt={watchlistMovie.Title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                {watchlistMovie.Year}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
                {watchlistMovie.Title}
              </h3>
              
              <div className="flex items-center mb-3">
                <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm text-gray-300">
                  {watchlistMovie.Ratings?.[0]?.Value || "N/A"}
                </span>
              </div>
              
              <p className="text-xs text-gray-400 mb-1">
                Released: {watchlistMovie.Released}
              </p>
              
              <p className="text-xs text-gray-400 line-clamp-2 mb-4">
                {watchlistMovie.Actors}
              </p>
              
              <button
                className="w-full py-2 px-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center"
                onClick={() => handleRemove(watchlistMovie.imdbID)}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WatchList;