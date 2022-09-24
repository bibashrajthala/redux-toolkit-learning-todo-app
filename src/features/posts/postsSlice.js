import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, title: "redux-toolkit", content: "learning redux toolkit" },
  {
    id: 2,
    title: "redux-slice",
    content: "I am also learning to work with the slice",
  },
];

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost(state, action) {
      console.log(action.payload);
      state.push(action.payload);
    },
  },
});

export const selectAllPosts = (state) => state.posts;

export const { addPost } = postsSlice.actions;

export default postsSlice.reducer;
