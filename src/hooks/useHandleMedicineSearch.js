import { useDispatch } from "react-redux";
import { addGptMedicineResult } from "../utils/gptSlice";
import {
  findMedicineByName,
  getMedicinesByCategory,
  searchMedicines,
} from "../utils/medicineInventory";
import openai from "../utils/openai";

// Function to get appropriate fallback image based on medicine type
const getFallbackImage = (medicineName) => {
  const name = medicineName.toLowerCase();

  // Different fallback images for different types of medicines
  if (name.includes("vitamin") || name.includes("supplement")) {
    return "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop";
  } else if (name.includes("joint") || name.includes("bone")) {
    return "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop";
  } else if (name.includes("skin") || name.includes("coat")) {
    return "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop";
  } else if (name.includes("digestive") || name.includes("enzyme")) {
    return "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop";
  } else if (name.includes("immune") || name.includes("antibiotic")) {
    return "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop";
  } else {
    // Default fallback image
    return "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop";
  }
};

// Function to determine category from medicine name
const getCategoryFromName = (medicineName) => {
  const name = medicineName.toLowerCase();

  if (name.includes("vitamin")) return "Vitamins";
  if (name.includes("joint") || name.includes("bone")) return "Joints & Bones";
  if (name.includes("skin") || name.includes("coat")) return "Skin & Coat";
  if (name.includes("digestive") || name.includes("enzyme"))
    return "Digestive Health";
  if (name.includes("immune") || name.includes("antibiotic")) return "Immunity";
  if (name.includes("supplement")) return "Supplements";

  return "General";
};

const useHandleMedicineSearch = () => {
  const dispatch = useDispatch();

  const handleMedicineSearch = async (searchQuery) => {
    try {
      // First, check if the medicine exists in our local inventory using improved search
      const localMatches = searchMedicines(searchQuery);

      if (localMatches.length > 0) {
        // If we have good local matches, return them
        const topMatches = localMatches.slice(0, 5); // Get top 5 matches

        dispatch(
          addGptMedicineResult({
            medicineNames: topMatches.map((med) => med.name),
            medicineDetails: topMatches.map((med) => ({
              ...med,
              searchScore: undefined,
            })), // Remove search score
            isLocalMatch: true,
          })
        );
        return;
      }

      // Check if any category matches
      const categoryMatches = getMedicinesByCategory(searchQuery);
      if (categoryMatches.length > 0) {
        // If category matches found, return them
        dispatch(
          addGptMedicineResult({
            medicineNames: categoryMatches.map((med) => med.name),
            medicineDetails: categoryMatches,
            isLocalMatch: true,
          })
        );
        return;
      }

      // If not found locally, proceed with GPT search
      const gptResult = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are a veterinary medicine expert. Provide only medicine names, no descriptions or explanations.",
          },
          {
            role: "user",
            content: `Suggest 5 best veterinary medicines available in India for: "${searchQuery}". Return only the medicine names, one per line, no numbering or descriptions.`,
          },
        ],
        model: "openai/gpt-4.1",
      });

      const rawText = gptResult.choices?.[0]?.message?.content;

      if (!rawText) {
        throw new Error("No response from GPT");
      }

      const medicineList = rawText
        .split("\n")
        .map((line) => line.replace(/^\d+\.\s*/, "").trim())
        .filter((line) => line && line.length > 0)
        .slice(0, 5); // Ensure we only get 5 results

      // Get detailed information for each medicine
      const medicineDetailsPromises = medicineList.map(async (medicineName) => {
        try {
          const detailResult = await openai.chat.completions.create({
            messages: [
              {
                role: "system",
                content:
                  "You are a veterinary medicine expert. Provide information in Marathi language only.",
              },
              {
                role: "user",
                content: `Provide detailed information about "${medicineName}" in Marathi. Include: 1) Ingredients (सामग्री), 2) How it is useful for pets (पाळीव प्राण्यांसाठी कसे उपयुक्त आहे), 3) Benefits (फायदे). Format as JSON with keys: ingredients, usefulness, benefits.`,
              },
            ],
            model: "openai/gpt-4.1",
          });

          const detailText = detailResult.choices?.[0]?.message?.content;

          try {
            // Try to parse JSON response
            const details = JSON.parse(detailText);
            return {
              name: medicineName,
              ingredients: details.ingredients || "माहिती उपलब्ध नाही",
              usefulness: details.usefulness || "माहिती उपलब्ध नाही",
              benefits: details.benefits || "माहिती उपलब्ध नाही",
              image: getFallbackImage(medicineName),
              category: getCategoryFromName(medicineName),
              price: null,
            };
          } catch (parseError) {
            // If JSON parsing fails, return raw text
            return {
              name: medicineName,
              ingredients: "माहिती उपलब्ध नाही",
              usefulness: "माहिती उपलब्ध नाही",
              benefits: "माहिती उपलब्ध नाही",
              image: getFallbackImage(medicineName),
              category: getCategoryFromName(medicineName),
              price: null,
            };
          }
        } catch (error) {
          console.error(`Error getting details for ${medicineName}:`, error);
          return {
            name: medicineName,
            ingredients: "माहिती उपलब्ध नाही",
            usefulness: "माहिती उपलब्ध नाही",
            benefits: "माहिती उपलब्ध नाही",
            image: getFallbackImage(medicineName),
            category: getCategoryFromName(medicineName),
            price: null,
          };
        }
      });

      const medicineDetails = await Promise.all(medicineDetailsPromises);

      dispatch(
        addGptMedicineResult({
          medicineNames: medicineList,
          medicineDetails: medicineDetails,
          isLocalMatch: false,
        })
      );
    } catch (error) {
      console.error("Error in medicine search:", error);
      // Handle error appropriately
    }
  };

  return handleMedicineSearch;
};

export default useHandleMedicineSearch;
