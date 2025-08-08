import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestion = () => {
  const { movieName, movieSearchResult } = useSelector((store) => store.gpt);

  if (!movieName) {
    console.log("No movieName found, returning null");
    return null;
  }

  if (!Array.isArray(movieName)) {
    console.log("movieName is not an array, returning null");
    return null;
  }

  if (!movieSearchResult || !Array.isArray(movieSearchResult)) {
    console.log("movieSearchResult is not valid, returning null");
    return null;
  }

  return (
    <div className="p-4 m-8 bg-black text-white z-50 bg-opacity-90">
      <div>
        {movieName.map((movie, index) => {
          // Extract the movies from the TMDB API response
          const tmdbResponse = movieSearchResult[index];
          const movies = tmdbResponse?.results || [];

          if (!movies || !Array.isArray(movies) || movies.length === 0) {
            console.log(`No valid movies found for index ${index}`);
            return null;
          }
          return <MovieList key={movie} title={movie} movies={movies} />;
        })}
      </div>
    </div>
  );
};

export default GptMovieSuggestion;
