import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gptSlice",
  initialState: {
    showgptSearch: false,
    movieName: null,
    movieSearchResult: null,
  },
  reducers: {
    toggleGptSearchVode(state, action) {
      state.showgptSearch = !state.showgptSearch;
    },
    addGptMovieResult(state, action) {
      const { movieName, movieSearchResult } = action.payload;
      state.movieName = action.movieName;
      state.movieSearchResult = action.movieSearchResult;
    },
  },
});

export const { toggleGptSearchVode, addGptMovieResult } = gptSlice.actions;

export default gptSlice.reducer;
