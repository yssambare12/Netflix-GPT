import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  useMovieTrailer(movieId);

  if (!trailerVideo?.key) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <iframe
        className="absolute inset-0 w-full h-full object-cover scale-105 sm:scale-110 translate-y-0 sm:-translate-y-8"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo.key +
          "?autoplay=1&mute=1&modestbranding=1&rel=0&showinfo=0&controls=0&loop=1&playlist=" +
          trailerVideo.key +
          "&start=0"
        }
        title="Movie Trailer Background"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        style={{ pointerEvents: "none" }}
      ></iframe>

      {/* Mobile overlay - stronger on mobile for text readability */}
      <div className="absolute inset-0 bg-black/40 sm:bg-black/20"></div>
    </div>
  );
};

export default VideoBackground;
