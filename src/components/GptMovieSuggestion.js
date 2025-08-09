import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestion = () => {
  const { movieName, movieSearchResult } = useSelector((store) => store.gpt);

  // Loading state
  if (!movieName && !movieSearchResult) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-4"></div>
            <div className="h-4 bg-gray-600 rounded w-48 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-600 rounded w-32 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  // No search performed yet
  if (!movieName) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-6">🎬</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Discover?
          </h2>
          <p className="text-gray-400 text-lg">
            Use our AI-powered search above to find amazing movie
            recommendations tailored to your preferences.
          </p>
        </div>
      </div>
    );
  }

  if (!Array.isArray(movieName)) {
    console.log("movieName is not an array, returning null");
    return null;
  }

  if (!movieSearchResult || !Array.isArray(movieSearchResult)) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-6">❌</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            No Results Found
          </h2>
          <p className="text-gray-400 text-lg">
            We couldn't find any movies matching your search. Try different
            keywords or genres.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Results Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-lg">
          ✨ AI Recommendations
        </h2>
        <p className="text-gray-300 text-lg">
          Based on your search, here are some amazing movies you might love
        </p>
      </div>

      {/* Movie Categories */}
      <div className="space-y-8 lg:space-y-12">
        {movieName.map((movie, index) => {
          // Extract the movies from the TMDB API response
          const tmdbResponse = movieSearchResult[index];
          const movies = tmdbResponse?.results || [];

          if (!movies || !Array.isArray(movies) || movies.length === 0) {
            return (
              <div
                key={movie}
                className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
              >
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  🎭 {movie}
                </h3>
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">🔍</div>
                  <p className="text-gray-400">
                    No movies found for this category
                  </p>
                </div>
              </div>
            );
          }

          return (
            <div key={movie} className="relative">
              {/* Category Container */}
              <div className="bg-gray-900/40 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-gray-700/30 shadow-2xl">
                {/* Category Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
                    <span className="text-2xl">🎭</span>
                    {movie}
                  </h3>
                  <div className="bg-red-600/20 backdrop-blur-sm px-4 py-2 rounded-full border border-red-500/30">
                    <span className="text-red-400 text-sm font-medium">
                      {movies.length} movies
                    </span>
                  </div>
                </div>

                {/* Movie List */}
                <MovieList title="" movies={movies} />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500/30 rounded-full blur-sm"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-purple-500/20 rounded-full blur-sm"></div>
            </div>
          );
        })}
      </div>

      {/* Footer Message */}
      <div className="text-center mt-12 mb-8">
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30">
          <p className="text-gray-300 text-lg">
            💡 <strong>Pro Tip:</strong> Click on any movie to learn more or try
            a new search for different recommendations!
          </p>
        </div>
      </div>
    </div>
  );
};

export default GptMovieSuggestion;
