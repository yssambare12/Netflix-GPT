import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  console.log(movies);

  if (!movies || movies.length === 0) {
    return <div>No movies found.</div>;
  }

  return (
    <div className="px-6 ">
      <h1 className="text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              posterPaths={movie.poster_path}
              // title={movie.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
