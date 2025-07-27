import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const moviesData = useSelector((store) => store.movies);
  return (
    <div className="">
      <MovieList title={"Now Playing"} movies={moviesData.nowplayingmovies} />
    </div>
  );
};

export default SecondaryContainer;
