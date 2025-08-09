import { ImageCDN } from "../utils/constants";
import { useDispatch } from "react-redux";
import { openMovieModal } from "../utils/movieModalSlice";

const MovieCard = ({
  posterPaths,
  movieId,
  movieTitle,
  onClick,
  movieData,
}) => {
  const dispatch = useDispatch();

  if (!posterPaths) {
    return (
      <div className="w-32 sm:w-36 lg:w-48 xl:w-52 flex-shrink-0">
        <div className="aspect-[2/3] bg-gray-800 rounded-lg flex items-center justify-center">
          <span className="text-gray-500 text-sm">No Image</span>
        </div>
      </div>
    );
  }

  const handleClick = () => {
    if (movieData) {
      // Open trailer overlay with complete movie data
      console.log("Opening modal with movie data:", movieData);
      try {
        dispatch(openMovieModal(movieData));
        console.log("Action dispatched successfully");
      } catch (error) {
        console.error("Error dispatching action:", error);
      }
    } else if (onClick && movieId) {
      // Fallback to original onClick behavior
      console.log("Using fallback onClick with movieId:", movieId);
      onClick(movieId);
    }
  };

  return (
    <div
      className="w-32 sm:w-36 lg:w-48 xl:w-52 flex-shrink-0 cursor-pointer group transition-all duration-300"
      onClick={handleClick}
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-all duration-300">
        {/* Movie Poster */}
        <img
          src={ImageCDN + posterPaths}
          alt={movieTitle || "Movie Poster"}
          className="w-full aspect-[2/3] object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Hover Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4">
            {movieTitle && (
              <h4 className="text-white font-semibold text-xs lg:text-sm mb-2 line-clamp-2">
                {movieTitle}
              </h4>
            )}
            <div className="flex items-center gap-2">
              <button
                className="flex items-center justify-center w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full
                               hover:bg-white/30 transition-colors duration-200"
              >
                <span className="text-white text-xs">▶</span>
              </button>
              <button
                className="flex items-center justify-center w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full
                               hover:bg-white/30 transition-colors duration-200"
              >
                <span className="text-white text-xs">+</span>
              </button>
            </div>
          </div>
        </div>

        {/* Rating Badge (you can add this if you have rating data) */}
        <div
          className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          ⭐ 8.5
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
