import { configureStore, createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users-slice",
  initialState: {},
  reducers: {
    users: (state, action) => {
      state.list = action.payload;
    },
    user: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { users, user } = usersSlice.actions;

export default configureStore({
  reducer: {
    users: usersSlice.reducer,
  },
});
