import "./App.css";
import SearchMovies from "./components/SearchMovies";
import { MyContext } from "./createContext/CreateContext";
import ShowMovieList from "./components/ShowMovieList";
import WatchList from "./components/WatchList";
function App() {
  return (
    <>
      <div className="flex flex-col justify-center items-center my-4">
        {/* search Section */}
        <SearchMovies />
        {/* Movies List Section */}
        <ShowMovieList/>
        <h1 className="text-6xl">WatchList with LocalStorage
        </h1>
        {/* WatchList */}
        <WatchList/>
      </div>
    </>
  );
}

export default App;
