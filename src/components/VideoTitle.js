const VideoTitle = ({ title, overview }) => {
  if (!title || !overview) return null;

  return (
    <div className="absolute inset-0 z-10 flex items-end sm:items-center justify-start">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-16">
        <div className="max-w-xs sm:max-w-md lg:max-w-2xl xl:max-w-3xl">
          {/* Movie Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-4 lg:mb-6 leading-tight drop-shadow-2xl">
            {title}
          </h1>

          {/* Movie Overview */}
          <p className="hidden sm:block text-sm lg:text-base xl:text-lg text-gray-200 mb-4 sm:mb-6 lg:mb-8 leading-relaxed drop-shadow-lg max-w-sm lg:max-w-xl">
            {overview.length > 120 ? overview.slice(0, 120) + "..." : overview}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-row gap-2 sm:gap-3 lg:gap-4">
            <button
              className="group flex items-center justify-center gap-1 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 
                             bg-white text-black font-semibold text-sm lg:text-lg rounded-md lg:rounded-lg
                             hover:bg-gray-200 transition-all duration-300 transform hover:scale-105
                             shadow-lg hover:shadow-xl"
            >
              <span className="text-sm sm:text-base lg:text-xl">▶</span>
              <span className="text-xs sm:text-sm lg:text-base">Play</span>
            </button>

            <button
              className="group flex items-center justify-center gap-1 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 
                             bg-gray-600/80 text-white font-semibold text-sm lg:text-lg rounded-md lg:rounded-lg
                             hover:bg-gray-500/90 transition-all duration-300 transform hover:scale-105
                             shadow-lg hover:shadow-xl backdrop-blur-sm"
            >
              <span className="text-sm sm:text-base lg:text-xl">ℹ</span>
              <span className="text-xs sm:text-sm lg:text-base">More Info</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
