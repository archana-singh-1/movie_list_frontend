import { useState, useEffect } from "react";
import "./App.css";
import MovieCol from "./MovieCol";

function App() {
  const [fetchData, setFetchData] = useState([]);
  const [searchYear, setSearchYear] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    fetch("https://movie-list-backend-three.vercel.app/api/movieList", {
      method: "GET",
      mode: "cors",
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(`HTTP error! Status: ${resp.status}`);
        }
        return resp.json();
      })
      .then((data) => {
        setFetchData(data);
        setFilteredMovies(data);
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
      });
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setFilteredMovies(
        searchYear
          ? fetchData.filter((movie) =>
              movie.year.toString().includes(searchYear)
            )
          : fetchData
      );
      setSearchYear("");
    }
  };

  return (
    <div>
      <input
        type="text"
        className="inputBtn"
        placeholder="Search here...."
        value={searchYear}
        onChange={(e) => setSearchYear(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <div className="container">
        {filteredMovies.length > 0 &&
          filteredMovies.map((movie, index) => (
            <div key={index} className="col">
              <MovieCol movie={movie} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
