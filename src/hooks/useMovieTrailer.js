import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowTrailerVideo } from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const addNowPlayingMovies = useSelector(
    (store) => store.movies.addNowPlayingMovies
  );
  const getMovieVideo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + movieId + "/videos",
      API_OPTIONS
    );

    const json = await data.json();

    const filterData = json.results.filter((video) => video.type == "Trailer");
    const trailer = filterData.length ? filterData[1] : json.results[0];

    // console.log(trailer);
    dispatch(addNowTrailerVideo(trailer));
  };

  useEffect(() => {
    if (!addNowPlayingMovies) {
      getMovieVideo();
    }
  }, []);
};

export default useMovieTrailer;
