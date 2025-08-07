import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestion = () => {
  const { movieName, movieSearchResult } = useSelector((store) => store.gpt);

  console.log(movieName);
  console.log(movieSearchResult);

  if (!movieName) {
    //show shimmer ui
    return null;
  }

  return (
    <div className="p-4 m-8 bg-black text-white z-50">
      <div>
        <MovieList title={movieName[0]} movies={movieSearchResult[0]} />
      </div>
    </div>
  );
};

export default GptMovieSuggestion;
