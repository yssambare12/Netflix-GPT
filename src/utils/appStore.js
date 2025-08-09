import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducers from "./movieSlice";
import gptReducers from "./gptSlice";
import configReducer from "./configSlice";
import movieModalReducer from "./movieModalSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducers,
    gpt: gptReducers,
    config: configReducer,
    movieModal: movieModalReducer,
  },
});

export default appStore;
