import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

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
    addUpcomingMovies(state, action) {
      state.upcomingMovies = action.payload;
    },
    addTopRatedMovies(state, action) {
      state.topRatedMovies = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addNowTrailerVideo,
  addPopularMovies,
  addUpcomingMovies,
  addTopRatedMovies,
} = movieSlice.actions;

export default movieSlice.reducer;
