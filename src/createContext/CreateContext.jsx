import React, { createContext, useState } from "react";

// Create context object
const MyContext = createContext();

function CreateContext({ children }) {
  // Global states
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState();
  const [movieData, setMovieData] = useState([]);
const [watchlist,setWatchList]=useState([]);
  // Bundle everything in one object
  const contextValue = {
    searchValue,
    setSearchValue,
    error,
    setError,
    movieData,
    setMovieData,
    watchlist,
    setWatchList,
   movieId: movieData?.imdbID||null,
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
}

export { MyContext }; // export context
export default CreateContext;
