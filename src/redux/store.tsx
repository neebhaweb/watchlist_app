import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";

const store = configureStore({
    reducer:{
        user: userReducer,
        movies: movieReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export default store;

