import React, { useContext, useState } from "react";
import { MyContext } from "../createContext/CreateContext";

function SearchMovies() {
  const { searchValue, setSearchValue, setError, setMovieData } =
    useContext(MyContext);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
const apiKey = import.meta.env.VITE_OMDB_API_KEY; 
  const handleClick = () => {
    if (!searchValue.trim()) return;

    setIsLoading(true);
    fetch(`https://www.omdbapi.com/?t=${searchValue}&apikey=${apiKey}`)

      .then((response) => response.json())
      .then((data) => {
        if (data.Response == "False") {
          setError(data.Error);
        } else {
          setMovieData((prev) => (prev ? [...prev, data] : [data]));
          setError(null);
        }
      })
      .catch((error) => {
        console.log(error);
        setError("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
        setSearchValue("");
      });
  };

  return (
    <section className="w-full max-w-2xl mx-auto px-4 mt-8 mb-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
          Movie Explorer
        </h1>
        <p className="text-gray-400">Discover and save your favorite films</p>
      </div>

      <div className="relative flex items-center bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 border border-gray-700 hover:border-blue-400">
        <div className="pl-5 pr-3">
          <svg
            className={`w-5 h-5 transition-colors duration-300 ${
              isFocused ? "text-blue-400" : "text-gray-500"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          className="flex-grow py-4 px-3 outline-none text-white placeholder-gray-500 bg-transparent"
          type="text"
          name="moviename"
          placeholder="Search for a movie..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
      
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
        />

        <button
          onClick={handleClick}
          disabled={!searchValue.trim() || isLoading}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-6 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Searching...
            </>
          ) : (
            "Search"
          )}
        </button>
      </div>

      <p className="text-center text-gray-500 mt-4 text-sm">
        Search for any movie to add to your personal watchlist
      </p>
    </section>
  );
}

export default SearchMovies;
