import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "1", name: "Bibash" },
  { id: "2", name: "Neha" },
];

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;
