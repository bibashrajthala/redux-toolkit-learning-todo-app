import { createSlice, nanoid } from "@reduxjs/toolkit";

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
    addPost: {
      reducer(state, action) {
        // console.log(action.payload);
        state.push(action.payload);
      },
      prepare(title, content) {
        // instead of sending data in our global state form {id,title,content} we can dispatch/send data as it is and prepare() of slice will take care of preparing the data shape we need,so our component dont have to know and dont care about global state shape
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
        };
      },
    },
  },
});

export const selectAllPosts = (state) => state.posts;

export const { addPost } = postsSlice.actions;

export default postsSlice.reducer;
