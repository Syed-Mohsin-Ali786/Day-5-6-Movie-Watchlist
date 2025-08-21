import React, { useContext } from "react";
import { MyContext } from "../createContext/CreateContext";

function SearchMovies() {
  const { searchValue, setSearchValue, setError, setMovieData } =
    useContext(MyContext);
  const handleClick = () => {
    fetch(`http://www.omdbapi.com/?t=${searchValue}&apikey=5dc7558f`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response == "False") {
          setError(data.Error);
          setMovieData(null);
        } else {
          console.log(data);
          setMovieData((prev) => (prev ? [...prev, data] : [data]));
          setError(null);
        }
      })
      .catch((error) => {
        console.log(error);
        setError("Something went wrong");
        setMovieData(null);
      });
    setSearchValue("");
  };
  return (
    <>
      <section>
        <div className="flex mt-6 ">
          <input
            className="mx-auto py-2 px-4 outline-0 border-amber-500 border"
            type="text"
            name="moviename"
            placeholder="Enter a Movie Name"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button onClick={handleClick} className="bg-green-700 py-2 px-4">
            Search
          </button>
        </div>
      </section>
    </>
  );
}

export default SearchMovies;
