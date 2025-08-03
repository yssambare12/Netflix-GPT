import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowplayingmovies: null,
    trailerVideo: null,
  },
  reducers: {
    addNowPlayingMovies(state, action) {
      state.nowplayingmovies = action.payload;
    },
    addNowTrailerVideo(state, action) {
      state.trailerVideo = action.payload;
    },
    showPopularMovies(state, action) {
      state.popularMovies = action.payload;
    },
  },
});

export const { addNowPlayingMovies, addNowTrailerVideo, showPopularMovies } =
  movieSlice.actions;

export default movieSlice.reducer;
