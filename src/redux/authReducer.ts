import { createSlice } from "@reduxjs/toolkit";
interface Props {
  user: {} |null
}
const initialState:Props = {
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
