import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gptSlice",
  initialState: {
    showgptSearch: false,
    medicineNames: null,
    medicineDetails: null,
    selectedMedicine: null,
    isLocalMatch: false,
  },
  reducers: {
    toggleGptSearchVode(state, action) {
      state.showgptSearch = !state.showgptSearch;
    },
    addGptMedicineResult(state, action) {
      const {
        medicineNames,
        medicineDetails,
        isLocalMatch = false,
      } = action.payload;
      state.medicineNames = medicineNames;
      state.medicineDetails = medicineDetails;
      state.isLocalMatch = isLocalMatch;
    },
    setSelectedMedicine(state, action) {
      state.selectedMedicine = action.payload;
    },
    clearSearchResults(state) {
      state.medicineNames = null;
      state.medicineDetails = null;
      state.isLocalMatch = false;
    },
  },
});

export const {
  toggleGptSearchVode,
  addGptMedicineResult,
  setSelectedMedicine,
  clearSearchResults,
} = gptSlice.actions;

export default gptSlice.reducer;
