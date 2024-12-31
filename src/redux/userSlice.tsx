import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: localStorage.getItem("userEmail") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.email = action.payload;
      localStorage.setItem("userEmail", action.payload);
    },
    logout: (state) => {
      state.email = null;
      localStorage.removeItem("userEmail");
      localStorage.removeItem("watchlist");
      localStorage.removeItem("watchlistTitle");
      localStorage.removeItem("currentSelectedTitle");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
