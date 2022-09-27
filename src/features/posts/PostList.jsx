import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { selectAllUsers } from "../users/usersSlice";
import {
  selectAllPosts,
  selectPostError,
  selectPostStatus,
  fetchPosts,
  // addReactionCount,
} from "./postsSlice";
import PostContent from "./PostContent";

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsError = useSelector(selectPostError);
  const postsStatus = useSelector(selectPostStatus);

  // console.log(users);
  // console.log(posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  let content;
  if (postsStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (postsStatus === "succeeded") {
    content = <PostContent posts={posts} />;
  } else if (postsStatus === "failed") {
    content = <p>{postsError}</p>;
  }

  return (
    <section>
      <h1>Posts</h1>
      {content}
    </section>
  );
};

export default PostList;
