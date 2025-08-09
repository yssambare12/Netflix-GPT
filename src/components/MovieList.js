import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies || !Array.isArray(movies) || movies.length === 0) return null;

  const handleMovieClick = (movieId) => {
    alert(`Movie ID: ${movieId}`);
  };

  return (
    <div className="mb-8 lg:mb-12">
      {/* Section Title */}
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
          {title}
        </h3>
        <button className="text-red-500 hover:text-red-400 text-sm lg:text-base font-medium transition-colors duration-200">
          View All →
        </button>
      </div>

      {/* Movies Scroll Container */}
      <div className="relative">
        <div className="flex gap-3 sm:gap-4 lg:gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth">
          {/* Custom scrollbar styles */}
          <style jsx>{`
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className="flex-shrink-0 first:ml-0 last:mr-0"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <MovieCard
                posterPaths={movie.poster_path}
                movieId={movie.id}
                movieTitle={movie.title || movie.original_title}
                movieData={movie}
                onClick={handleMovieClick}
              />
            </div>
          ))}
        </div>

        {/* Fade edges for better visual */}
        <div className="absolute top-0 left-0 bottom-0 w-8 lg:w-16 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 bottom-0 w-8 lg:w-16 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default MovieList;
