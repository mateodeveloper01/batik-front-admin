import { createSlice } from "@reduxjs/toolkit";
export interface PropsStateUser {
  user: {
    message: string;
    data: string;
    user: {
      email: string;
      password: string;
    };
  } | null;
}
const initialState: PropsStateUser = {
  user: null,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = authSlice.actions;

export default authSlice.reducer;
