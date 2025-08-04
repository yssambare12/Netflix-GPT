import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gptSlice",
  initialState: {
    showgptSearch: false,
  },
  reducers: {
    toggleGptSearchVode(state, action) {
      state.showgptSearch = !state.showgptSearch;
    },
  },
});

export const { toggleGptSearchVode } = gptSlice.actions;

export default gptSlice.reducer;
