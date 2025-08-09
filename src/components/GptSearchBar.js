import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import useHandleMedicineSearch from "../hooks/useHandleMedicineSearch";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchtext = useRef(null);

  const handleMedicineSearch = useHandleMedicineSearch();

  const handleSearch = async () => {
    const searchQuery = searchtext.current.value;
    if (searchQuery.trim()) {
      await handleMedicineSearch(searchQuery);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    searchtext.current.value = suggestion;
    handleMedicineSearch(suggestion);
  };

  return (
    <div className="flex justify-center items-center px-4 mb-8">
      <div className="w-full max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
            🐾 Pet Medicine Search
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto drop-shadow-lg">
            {lang[langKey]?.searchDescription ||
              "Find the right medicine for your pet with AI-powered search"}
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={(e) => e.preventDefault()} className="relative">
          <div className="relative flex flex-col sm:flex-row gap-3 sm:gap-0 bg-black/60 backdrop-blur-sm rounded-2xl p-3 border border-gray-700/50 shadow-2xl">
            {/* Search Input */}
            <div className="flex-1 relative">
              <input
                type="text"
                ref={searchtext}
                className="w-full px-6 py-4 bg-gray-800/50 border border-gray-600 rounded-xl sm:rounded-r-none
                         text-white placeholder-gray-400 text-lg focus:outline-none focus:ring-2 
                         focus:ring-green-500 focus:border-transparent transition-all duration-300
                         hover:bg-gray-700/50"
                placeholder={
                  lang[langKey]?.gptSearchPlaceholder ||
                  "Search for pet medicines..."
                }
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 
                       text-white font-semibold text-lg rounded-xl sm:rounded-l-none transition-all duration-300 
                       transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 
                       focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black/60
                       flex items-center justify-center gap-2 min-w-[140px]"
            >
              <span>{lang[langKey]?.search || "Search"}</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                ></path>
              </svg>
            </button>
          </div>

          {/* Search Suggestions */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {(
              lang[langKey]?.searchSuggestions || [
                "Dog Supplements",
                "Pet Vitamins",
                "Milk Increase Medicine",
                "Joint Care",
                "Skin Health",
              ]
            ).map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700/70 text-gray-300 hover:text-white 
                         text-sm rounded-full border border-gray-600/50 transition-all duration-200
                         hover:border-green-500/50 hover:shadow-lg"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default GptSearchBar;
