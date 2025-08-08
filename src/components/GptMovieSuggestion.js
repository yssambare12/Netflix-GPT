import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestion = () => {
  const { movieName, movieSearchResult } = useSelector((store) => store.gpt);

  

  if (!movieName || !movieSearchResult) {
    
    return null;
  }

  return (
    <div className="p-4 m-8 bg-black text-white z-50">
      <div>
        {movieName.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieSearchResult[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestion;
