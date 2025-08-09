import { useSelector } from "react-redux";
import {
  medicineInventory,
  getMatchingMedicines,
  getRandomMedicines,
} from "../utils/medicineInventory";
import MedicineCard from "./MedicineCard";
import lang from "../utils/languageConstants";

const GptMedicineSuggestion = () => {
  const { medicineNames, medicineDetails, isLocalMatch } = useSelector(
    (store) => store.gpt
  );
  const langKey = useSelector((store) => store.config.lang);

  // Loading state
  if (!medicineNames && !medicineDetails) {
    // Get random featured medicines
    const featuredMedicines = getRandomMedicines(8);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Medicines Section */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center drop-shadow-lg">
            <span className="text-green-400">🌟</span>{" "}
            {lang[langKey]?.featured || "Featured Medicines"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredMedicines.map((medicine) => (
              <MedicineCard
                key={medicine.id}
                medicine={medicine}
                isInventory={true}
              />
            ))}
          </div>
        </div>

        {/* All Products Section */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center drop-shadow-lg">
            <span className="text-blue-400">🏪</span> All Available Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {medicineInventory.map((medicine) => (
              <MedicineCard
                key={medicine.id}
                medicine={medicine}
                isInventory={true}
              />
            ))}
          </div>
        </div>

        {/* Ready to Search Message */}
        <div className="text-center py-16">
          <div className="text-6xl mb-6">🐾</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {lang[langKey]?.readyToSearch ||
              "Ready to find the right medicine for your pet?"}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {lang[langKey]?.searchDescription ||
              "Search in English or Marathi for pet medicines, supplements, and treatments"}
          </p>
          <div className="mt-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-4 border border-green-500/30 max-w-2xl mx-auto">
            <p className="text-green-400 text-sm">
              💡 <strong>Tip:</strong> We have {medicineInventory.length}{" "}
              verified products in our inventory. Search for specific medicines
              or browse by category!
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!Array.isArray(medicineNames)) {
    return null;
  }

  if (!medicineDetails || !Array.isArray(medicineDetails)) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-6">❌</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {lang[langKey]?.noResults || "No medicines found"}
          </h2>
          <p className="text-gray-400 text-lg">
            We couldn't find any medicines matching your search. Try different
            keywords.
          </p>
        </div>
      </div>
    );
  }

  // Get matching medicines from inventory
  const matchingMedicines = getMatchingMedicines(medicineNames);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Results Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-lg">
          <span className="text-green-400">🔍</span>{" "}
          {lang[langKey]?.searchResults || "Search Results"}
        </h2>
        <p className="text-gray-300 text-lg">
          {isLocalMatch
            ? "Found exact matches in our inventory!"
            : "Based on your search, here are the recommended medicines"}
        </p>

        {/* Source Indicator */}
        {isLocalMatch && (
          <div className="mt-4 inline-block bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-3 border border-green-500/30">
            <p className="text-green-400 text-sm font-medium">
              ✅ Results from our verified inventory - No API calls needed!
            </p>
          </div>
        )}
      </div>

      {/* Local Inventory Results (if any) */}
      {matchingMedicines.length > 0 && !isLocalMatch && (
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-green-400">✅</span>
            Available in Our Shop
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {matchingMedicines.map((medicine) => (
              <MedicineCard
                key={medicine.id}
                medicine={medicine}
                isInventory={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Main Results */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          {isLocalMatch ? (
            <>
              <span className="text-green-400">🏪</span>
              Inventory Matches
            </>
          ) : (
            <>
              <span className="text-blue-400">🤖</span>
              AI Recommendations
            </>
          )}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {medicineDetails.map((medicine, index) => (
            <MedicineCard
              key={index}
              medicine={medicine}
              isInventory={isLocalMatch}
            />
          ))}
        </div>
      </div>

      {/* Footer Message */}
      <div className="text-center mt-12 mb-8">
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30">
          <p className="text-gray-300 text-lg">
            {isLocalMatch ? (
              <>
                💡 <strong>Great!</strong> We found exact matches in our
                inventory. These products are available for immediate purchase
                with guaranteed quality.
              </>
            ) : (
              <>
                💡 <strong>Pro Tip:</strong> Click on any medicine to learn more
                details in Marathi! Some products may be available in our
                inventory.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GptMedicineSuggestion;
