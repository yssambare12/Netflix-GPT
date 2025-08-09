import { useDispatch } from "react-redux";
import { setSelectedMedicine } from "../utils/gptSlice";
import { useState } from "react";

const MedicineCard = ({ medicine, isInventory = false }) => {
  const dispatch = useDispatch();
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleCardClick = () => {
    if (isInventory) {
      // For inventory items, we already have complete details
      dispatch(setSelectedMedicine(medicine));
    } else {
      // For GPT results, we already have details
      dispatch(setSelectedMedicine(medicine));
    }
  };

  const handleWhatsAppClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking WhatsApp button

    const phoneNumber = "9022395264";
    const productName = medicine.name;
    const productPrice = medicine.price
      ? `₹${medicine.price}`
      : "Price not available";
    const productCategory = medicine.category;

    // Marathi message about product inquiry
    const message = `नमस्कार! मी ${productName} या उत्पादनाबद्दल माहिती घेऊ इच्छितो/इच्छिते.

उत्पादनाचे नाव: ${productName}
किंमत: ${productPrice}
श्रेणी: ${productCategory}

कृपया या उत्पादनाबद्दल अधिक माहिती द्या.`;

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
    if (imageError) {
      return "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop";
    }
    return (
      medicine.image ||
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop"
    );
  };

  return (
    <div className="group relative">
      <div
        className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 
                   border border-gray-600/30 hover:border-green-500/60 transition-all duration-500 
                   cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20
                   overflow-hidden"
        onClick={handleCardClick}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Medicine Image */}
        <div className="relative mb-6">
          <div className="relative overflow-hidden rounded-xl">
            {/* Loading Placeholder */}
            {imageLoading && (
              <div className="w-full h-52 bg-gradient-to-br from-gray-700 to-gray-800 animate-pulse flex items-center justify-center">
                <div className="text-gray-400 text-sm">Loading...</div>
              </div>
            )}

            <img
              src={getImageSrc()}
              alt={medicine.name}
              className={`w-full h-52 object-cover transform group-hover:scale-110 transition-transform duration-700 ${
                imageLoading ? "hidden" : "block"
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Status Badge */}
          {isInventory ? (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg transform group-hover:scale-110 transition-transform duration-200">
              <span className="mr-1">✓</span> In Stock
            </div>
          ) : (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg transform group-hover:scale-110 transition-transform duration-200">
              <span className="mr-1">🤖</span> AI Info
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg font-medium">
            {medicine.category || "General"}
          </div>
        </div>

        {/* Medicine Info */}
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-green-400 transition-colors duration-300">
            {medicine.name}
          </h3>

          {medicine.price && (
            <div className="text-green-400 font-bold text-2xl mb-3 flex items-center gap-2">
              <span className="text-lg">₹</span>
              {medicine.price}
              <span className="text-sm text-gray-400 font-normal">/unit</span>
            </div>
          )}

          {/* Quick Info Preview */}
          {medicine.ingredients && (
            <div className="mb-4">
              <div className="text-sm text-gray-300 line-clamp-2">
                <span className="text-green-400 font-medium">Ingredients:</span>{" "}
                {medicine.ingredients}
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="mt-4 space-y-3">
            <button
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 
                               text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 
                               transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
              View Details
            </button>

            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 
                               text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 
                               transform hover:scale-105 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              WhatsApp वर पूछताछ करा
            </button>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-green-500/20 via-transparent to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        ></div>

        {/* Floating Elements */}
        <div className="absolute top-4 left-4 w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-150"></div>
        <div className="absolute bottom-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-150 delay-100"></div>
      </div>

      {/* Card Shadow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 transform group-hover:scale-105"></div>
    </div>
  );
};

export default MedicineCard;
