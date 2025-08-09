import { ImageCDN } from "../utils/constants";
import { useDispatch } from "react-redux";
import { openMovieModal } from "../utils/movieModalSlice";
import { useState } from "react";

const MovieCard = ({
  posterPaths,
  movieId,
  movieTitle,
  onClick,
  movieData,
}) => {
  const dispatch = useDispatch();
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleWhatsAppClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking WhatsApp button

    const phoneNumber = "9022395264";
    const movieName = movieTitle || "Movie";

    // Marathi message about movie inquiry
    const message = `नमस्कार! मी ${movieName} या चित्रपटाबद्दल माहिती घेऊ इच्छितो/इच्छिते.

चित्रपटाचे नाव: ${movieName}

कृपया या चित्रपटाबद्दल अधिक माहिती द्या.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const getImageSrc = () => {
    if (imageError || !posterPaths) {
      return "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop";
    }
    return ImageCDN + posterPaths;
  };

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
      try {
        dispatch(openMovieModal(movieData));
      } catch (error) {
        // Action dispatch failed silently
      }
    } else if (onClick && movieId) {
      // Fallback to original onClick behavior
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
        {imageLoading && (
          <div className="w-full aspect-[2/3] bg-gradient-to-br from-gray-700 to-gray-800 animate-pulse flex items-center justify-center">
            <div className="text-gray-400 text-xs">Loading...</div>
          </div>
        )}

        <img
          src={getImageSrc()}
          alt={movieTitle || "Movie Poster"}
          className={`w-full aspect-[2/3] object-cover transition-transform duration-500 group-hover:scale-110 ${
            imageLoading ? "hidden" : "block"
          }`}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
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
              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center justify-center w-8 h-8 bg-green-500 hover:bg-green-600 rounded-full
                               transition-colors duration-200"
                title="WhatsApp वर पूछताछ करा"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
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
