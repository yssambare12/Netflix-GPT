import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
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
    getNowPlayingMovide();
  }, []);
};

export default useNowPlayingMovies;
