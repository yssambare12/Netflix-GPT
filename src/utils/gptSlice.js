import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gptSlice",
  initialState: {
    showgptSearch: false,
    movieName: null,
    movieSearchResult: null,
    error: null,
  },
  reducers: {
    toggleGptSearchVode(state, action) {
      state.showgptSearch = !state.showgptSearch;
    },
    addGptMovieResult(state, action) {
      const { movieName, movieSearchResult, error = null } = action.payload;
      state.movieName = movieName;
      state.movieSearchResult = movieSearchResult;
      state.error = error;
    },
  },
});

export const { toggleGptSearchVode, addGptMovieResult } = gptSlice.actions;

export default gptSlice.reducer;
