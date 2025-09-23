import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowTrailerVideo } from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let isCancelled = false;

    const fetchTrailer = async () => {
      if (!movieId) {
        dispatch(addNowTrailerVideo(null));
        return;
      }

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          API_OPTIONS
        );

        if (!response.ok) {
          throw new Error("Failed to fetch trailer");
        }

        const data = await response.json();
        const results = Array.isArray(data?.results) ? data.results : [];

        // Prefer YouTube trailers, pick official if available
        const youtubeTrailers = results.filter(
          (video) => video.site === "YouTube" && video.type === "Trailer"
        );
        const selectedTrailer =
          youtubeTrailers.find((v) => v.official === true) ||
          youtubeTrailers[0] ||
          // fallback: any YouTube video (teaser/clip)
          results.find((v) => v.site === "YouTube") ||
          null;

        if (!isCancelled) {
          dispatch(addNowTrailerVideo(selectedTrailer));
        }
      } catch (e) {
        if (!isCancelled) {
          dispatch(addNowTrailerVideo(null));
        }
      }
    };

    fetchTrailer();

    return () => {
      isCancelled = true;
    };
  }, [movieId, dispatch]);
};

export default useMovieTrailer;
