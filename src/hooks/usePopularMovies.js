import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const getPopularMovie = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?age=1",
      API_OPTIONS
    );

    const json = await data.json();

    console.log(json);

    dispatch(addPopularMovies(json.results));

    // console.log(json.results);
  };

  useEffect(() => {
    getPopularMovie();
  }, []);
};

export default usePopularMovies;
