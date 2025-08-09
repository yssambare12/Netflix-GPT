import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeMovieModal } from "../utils/movieModalSlice";
import useMovieTrailerModal from "../hooks/useMovieTrailerModal";
import { ImageCDN } from "../utils/constants";

const MovieTrailerOverlay = () => {
  const dispatch = useDispatch();
  const { fetchMovieTrailer } = useMovieTrailerModal();

  const { isOpen, selectedMovie, selectedMovieTrailer, isLoading } =
    useSelector((store) => store.movieModal);

  // Debug logging
  console.log("Modal State:", {
    isOpen,
    selectedMovie,
    selectedMovieTrailer,
    isLoading,
  });

  useEffect(() => {
    if (isOpen && selectedMovie?.id) {
      console.log("Opening modal for movie:", selectedMovie.id); // Debug log
      fetchMovieTrailer(selectedMovie.id);
    }
  }, [isOpen, selectedMovie?.id, fetchMovieTrailer]);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    dispatch(closeMovieModal());
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Debug: Always show modal for testing
  if (!isOpen || !selectedMovie) {
    console.log("Modal not showing:", { isOpen, selectedMovie });
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      {/* Modal Container */}
      <div className="relative w-full max-w-6xl mx-auto bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/70 hover:bg-black/90 
                     text-white rounded-full flex items-center justify-center
                     transition-all duration-200 hover:scale-110 group"
        >
          <svg
            className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row min-h-[500px] max-h-[90vh]">
          {/* Video Section */}
          <div className="flex-1 bg-black relative">
            {isLoading ? (
              <div className="aspect-video flex items-center justify-center bg-gray-800">
                <div className="text-center">
                  <div className="animate-spin w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-white text-lg">Loading trailer...</p>
                </div>
              </div>
            ) : selectedMovieTrailer?.key ? (
              <>
                {/* Debug info - remove this later */}
                <div className="absolute top-2 left-2 z-10 bg-black/70 text-white text-xs p-2 rounded">
                  Trailer Key: {selectedMovieTrailer.key}
                </div>
                <iframe
                  className="w-full aspect-video"
                  src={`https://www.youtube.com/embed/${selectedMovieTrailer.key}?autoplay=1&rel=0&modestbranding=1&mute=1&enablejsapi=1&origin=${window.location.origin}`}
                  title={`${
                    selectedMovie.title || selectedMovie.original_title
                  } Trailer`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  onError={() => console.log("Iframe failed to load")}
                />
                {/* Fallback link in case iframe doesn't work */}
                <div className="absolute bottom-2 left-2 z-10">
                  <a
                    href={`https://www.youtube.com/watch?v=${selectedMovieTrailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded-full transition-colors duration-200"
                  >
                    Watch on YouTube ↗
                  </a>
                </div>
              </>
            ) : (
              <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                <div className="text-center px-8">
                  <div className="text-6xl mb-4">🎬</div>
                  <h3 className="text-white text-xl font-semibold mb-2">
                    Trailer Not Available
                  </h3>
                  <p className="text-gray-400">
                    Sorry, we couldn't find a trailer for this movie.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Movie Info Section */}
          <div className="w-full lg:w-96 bg-gray-900 p-6 lg:p-8 overflow-y-auto">
            <div className="space-y-6">
              {/* Movie Poster & Title */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={
                      selectedMovie.poster_path
                        ? ImageCDN + selectedMovie.poster_path
                        : "/api/placeholder/120/180"
                    }
                    alt={selectedMovie.title || selectedMovie.original_title}
                    className="w-20 h-30 object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl lg:text-2xl font-bold text-white mb-2 leading-tight">
                    {selectedMovie.title || selectedMovie.original_title}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>
                      {new Date(selectedMovie.release_date).getFullYear()}
                    </span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{selectedMovie.vote_average?.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Overview */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Overview
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {selectedMovie.overview ||
                    "No overview available for this movie."}
                </p>
              </div>

              {/* Additional Info */}
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400">Release Date</span>
                  <span className="text-white">
                    {selectedMovie.release_date
                      ? new Date(
                          selectedMovie.release_date
                        ).toLocaleDateString()
                      : "Not available"}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400">Rating</span>
                  <span className="text-white">
                    {selectedMovie.vote_average
                      ? `${selectedMovie.vote_average.toFixed(1)}/10`
                      : "Not rated"}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400">Popularity</span>
                  <span className="text-white">
                    {selectedMovie.popularity
                      ? Math.round(selectedMovie.popularity).toLocaleString()
                      : "Not available"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
                  Add to Watchlist
                </button>
                <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
                  More Info
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieTrailerOverlay;
