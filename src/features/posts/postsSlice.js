import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";
import axios from "axios";

// const initialState = [
//   {
//     id: 1,
//     title: "redux-toolkit",
//     content: "learning redux toolkit",
//     date: moment(Date.now()).fromNow(),
//     reactions: {
//       like: 0,
//       love: 0,
//       punk: 0,
//       peace: 0,
//     },
//   },
//   {
//     id: 2,
//     title: "redux-slice",
//     content: "I am also learning to work with the slice",
//     date: moment(Date.now()).fromNow(),
//     reactions: {
//       like: 0,
//       love: 0,
//       punk: 0,
//       peace: 0,
//     },
//   },
// ];

const initialState = {
  posts: [],
  status: "idle", // idle or pending or succeeded or failed
  error: null,
};

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        // console.log(action.payload);
        state.posts.push(action.payload);
      },
      prepare(title, content, userId, date) {
        // instead of sending data in our global state form {id,title,content} we can dispatch/send data as it is and prepare() of slice will take care of preparing the data shape we need,so our component dont have to know and dont care about global state shape
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date,
            reactions: {
              like: 0,
              love: 0,
              punk: 0,
              peace: 0,
            },
          },
        };
      },
    },
    addReactionCount: {
      reducer(state, action) {
        const { postId, reaction } = action.payload;
        const reactedPost = state.posts.find((post) => post.id === postId);
        reactedPost.reactions[reaction]++;
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
        const loadedPosts = state.posts.map((post) => {
          post.reactions = {
            like: 0,
            love: 0,
            punk: 0,
            peace: 0,
          };

          post.date = moment(new Date()).fromNow();

          return post;
        });
        state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const selectPostStatus = (state) => state.posts.status;
export const selectPostError = (state) => state.posts.error;

export const { addPost, addReactionCount } = postsSlice.actions;

export default postsSlice.reducer;
