import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const nowplayingmovies = useSelector((store) => store.moviesnowplayingmovies);
  const getNowPlayingMovide = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?age=1",
      API_OPTIONS
    );

    const json = await data.json();

    dispatch(addNowPlayingMovies(json.results));

    // console.log(json.results);
  };

  useEffect(() => {
    if (!nowplayingmovies) {
      getNowPlayingMovide();
    }
  }, []);
};

export default useNowPlayingMovies;
