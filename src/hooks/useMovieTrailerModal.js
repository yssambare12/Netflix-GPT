import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { API_OPTIONS } from "../utils/constants";
import { setMovieTrailer, setLoading } from "../utils/movieModalSlice";

const useMovieTrailerModal = () => {
  const dispatch = useDispatch();

  const fetchMovieTrailer = useCallback(
    async (movieId) => {
      if (!movieId) return;

      try {
        dispatch(setLoading(true));

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          API_OPTIONS
        );

        if (!response.ok) {
          throw new Error("Failed to fetch trailer");
        }

        const data = await response.json();

        // Filter for trailers, prefer official trailers
        const trailers = data.results.filter(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        // Get the best trailer (official, then first available)
        const selectedTrailer =
          trailers.find((trailer) => trailer.official === true) ||
          trailers[0] ||
          data.results[0];

        console.log("Fetched trailer data:", selectedTrailer); // Debug log
        dispatch(setMovieTrailer(selectedTrailer));
      } catch (error) {
        console.error("Error fetching movie trailer:", error);
        dispatch(setMovieTrailer(null));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  return { fetchMovieTrailer };
};

export default useMovieTrailerModal;
