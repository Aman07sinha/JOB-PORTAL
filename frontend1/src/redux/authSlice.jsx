// ye saare user ka information h

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  isAuthenticated: false,

};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;

    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
            state.isAuthenticated = false;

    },
  },
});

export const { setUser, setLoading, logoutUser } = authSlice.actions;
export default authSlice.reducer;
