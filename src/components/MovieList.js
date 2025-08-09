import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies || !Array.isArray(movies) || movies.length === 0) return null;

  const handleMovieClick = (movieId) => {
    alert(`Movie ID: ${movieId}`);
  };

  return (
    <div className="px-6">
      <h1 className="text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              posterPaths={movie.poster_path}
              movieId={movie.id}
              onClick={handleMovieClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
