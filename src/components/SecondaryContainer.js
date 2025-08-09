import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const moviesData = useSelector((store) => store.movies);

  return (
    <section className="relative bg-black -mt-20 pt-20 pb-8 lg:pb-16">
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 lg:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
            Discover Movies
          </h2>
          <p className="text-gray-400 text-sm lg:text-base">
            Explore our curated collection of the latest and greatest films
          </p>
        </div>

        {/* Movie Lists */}
        <div className="space-y-6 lg:space-y-8">
          <MovieList
            title="🔥 Now Playing"
            movies={moviesData.nowplayingmovies}
          />
          <MovieList
            title="⭐ Popular Movies"
            movies={moviesData.popularMovies}
          />
          <MovieList
            title="🎬 Upcoming Movies"
            movies={moviesData.upcomingMovies}
          />
          <MovieList
            title="🏆 Top Rated Movies"
            movies={moviesData.topRatedMovies}
          />
        </div>
      </div>
    </section>
  );
};

export default SecondaryContainer;
