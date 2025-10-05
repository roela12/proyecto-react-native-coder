import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: "",
    localId: "",
    profilePicture: "",
  },
  reducers: {
    setUserEmail: (state, action) => {
      state.user = action.payload;
    },
    setLocalId: (state, action) => {
      state.localId = action.payload;
    },
    setProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
    },
  },
});

export const { setUserEmail, setLocalId, setProfilePicture } =
  userSlice.actions;

export default userSlice.reducer;
