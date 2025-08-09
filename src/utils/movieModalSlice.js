import { createSlice } from "@reduxjs/toolkit";

const movieModalSlice = createSlice({
  name: "movieModal",
  initialState: {
    isOpen: false,
    selectedMovie: null,
    selectedMovieTrailer: null,
    isLoading: false,
  },
  reducers: {
    openMovieModal(state, action) {
      state.isOpen = true;
      state.selectedMovie = action.payload;
      state.isLoading = true;
      state.selectedMovieTrailer = null;
    },
    closeMovieModal(state) {
      state.isOpen = false;
      state.selectedMovie = null;
      state.selectedMovieTrailer = null;
      state.isLoading = false;
    },
    setMovieTrailer(state, action) {
      state.selectedMovieTrailer = action.payload;
      state.isLoading = false;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const {
  openMovieModal,
  closeMovieModal,
  setMovieTrailer,
  setLoading,
} = movieModalSlice.actions;

export default movieModalSlice.reducer;