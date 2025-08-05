import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const moviesData = useSelector((store) => store.movies);
  // console.log(moviesData);
  return (
    <div className=" bg-black">
      <div className="-mt-28 pl-12 relative z-20">
        <MovieList title={"Now Playing"} movies={moviesData.nowplayingmovies} />
        <MovieList title={"Popular Movies"} movies={moviesData.popularMovies} />
        <MovieList
          title={"Upcoming Movies"}
          movies={moviesData.upcomingMovies}
        />
        <MovieList
          title={"Top Rated Movies"}
          movies={moviesData.topRatedMovies}
        />
      </div>
    </div>
  );
};

export default SecondaryContainer;
