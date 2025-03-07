import "./App.css";

function MovieCol({ movie }) {
  return (
    <div className="col">
      <img src={movie.poster} alt="Movie Poster"  className="imgmovie"/> 
      <p className="title">{movie.title}</p>
      <p className="year">{movie.year}</p>
    </div>
  );
}

export default MovieCol;
