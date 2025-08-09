import { BGImage } from "../utils/constants";
import GptMedicineSuggestion from "./GptMedicineSuggestion";
import GptSearchBar from "./GptSearchBar";
import MedicineDetailModal from "./MedicineDetailModal";

const GptSearch = () => {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Background Image with Enhanced Overlay */}
      <div className="fixed inset-0 z-0">
        <img
          src={BGImage}
          alt="Pet Medicine Search Background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        <div className="pt-20 pb-8">
          <GptSearchBar />
          <GptMedicineSuggestion />
        </div>
      </div>

      {/* Medicine Detail Modal */}
      <MedicineDetailModal />
    </div>
  );
};

export default GptSearch;
