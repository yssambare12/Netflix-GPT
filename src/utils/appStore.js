import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducers from "./movieSlice";
import gptReducers from "./gptSlice";
import configReducer from "./configSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducers,
    gpt: gptReducers,
    config: configReducer,
  },
});

export default appStore;
