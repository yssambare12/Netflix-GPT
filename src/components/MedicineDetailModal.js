import { useSelector, useDispatch } from "react-redux";
import { setSelectedMedicine } from "../utils/gptSlice";

const MedicineDetailModal = () => {
  const selectedMedicine = useSelector((store) => store.gpt.selectedMedicine);
  const dispatch = useDispatch();

  if (!selectedMedicine) return null;

  const handleClose = () => {
    dispatch(setSelectedMedicine(null));
  };

  const isLocalMedicine = selectedMedicine.id && selectedMedicine.category;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fadeIn"
        onClick={handleClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-600/50 shadow-2xl animate-slideUp">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors duration-200 bg-gray-800/50 hover:bg-gray-700/50 p-2 rounded-full backdrop-blur-sm"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        {/* Medicine Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            {isLocalMedicine ? (
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                <span className="mr-2">✓</span> Available in Shop
              </div>
            ) : (
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                <span className="mr-2">🤖</span> AI Generated Info
              </div>
            )}
            {selectedMedicine.category && (
              <div className="bg-gray-700/50 text-gray-300 px-3 py-2 rounded-full text-sm font-medium">
                {selectedMedicine.category}
              </div>
            )}
          </div>

          <h2 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">
            {selectedMedicine.name}
          </h2>

          {selectedMedicine.price && (
            <div className="text-3xl font-bold text-green-400 mb-2">
              ₹{selectedMedicine.price}
            </div>
          )}
        </div>

        {/* Medicine Image */}
        {selectedMedicine.image && (
          <div className="mb-8 text-center">
            <div className="relative inline-block">
              <img
                src={selectedMedicine.image}
                alt={selectedMedicine.name}
                className="w-full max-w-lg h-80 object-cover rounded-2xl shadow-2xl border-4 border-gray-700/50"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop";
                }}
              />
              {/* Image Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 to-transparent rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        )}

        {/* Medicine Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Ingredients */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-2xl p-6 border border-gray-600/30 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-green-400 text-3xl">🧪</span>
              सामग्री (Ingredients)
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              {selectedMedicine.ingredients}
            </p>
          </div>

          {/* Usefulness */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-2xl p-6 border border-gray-600/30 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-blue-400 text-3xl">🐾</span>
              पाळीव प्राण्यांसाठी कसे उपयुक्त आहे
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              {selectedMedicine.usefulness}
            </p>
          </div>

          {/* Benefits */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-2xl p-6 border border-gray-600/30 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-yellow-400 text-3xl">✨</span>
              फायदे (Benefits)
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              {selectedMedicine.benefits}
            </p>
          </div>

          {/* Additional Info */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-2xl p-6 border border-gray-600/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-purple-400 text-3xl">ℹ️</span>
              Additional Information
            </h3>
            <div className="space-y-3 text-gray-300">
              {selectedMedicine.category && (
                <div>
                  <span className="text-purple-400 font-semibold">
                    Category:
                  </span>{" "}
                  {selectedMedicine.category}
                </div>
              )}
              {selectedMedicine.id && (
                <div>
                  <span className="text-purple-400 font-semibold">
                    Product ID:
                  </span>{" "}
                  {selectedMedicine.id}
                </div>
              )}
              <div>
                <span className="text-purple-400 font-semibold">Source:</span>{" "}
                {isLocalMedicine ? "Our Inventory" : "AI Generated"}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95">
            🛒 Add to Cart
          </button>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95">
            🏥 Contact Vet
          </button>
          {isLocalMedicine && (
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95">
              📞 Order Now
            </button>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-gray-800/30 to-gray-700/30 backdrop-blur-sm rounded-xl p-4 border border-gray-600/20">
            <p className="text-gray-400 text-sm">
              💡 <strong>Note:</strong>{" "}
              {isLocalMedicine
                ? "This product is available in our shop with guaranteed quality and authenticity."
                : "This information is AI-generated and should be verified with a veterinarian before use."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetailModal;
