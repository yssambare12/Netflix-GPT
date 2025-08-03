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
    addPopularMovies(state, action) {
      state.popularMovies = action.payload;
    },
  },
});

export const { addNowPlayingMovies, addNowTrailerVideo, addPopularMovies } =
  movieSlice.actions;

export default movieSlice.reducer;
