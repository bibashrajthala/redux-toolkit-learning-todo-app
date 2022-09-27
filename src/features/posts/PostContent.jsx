import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { addReactionCount } from "./postsSlice";

const PostContent = ({ posts }) => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);

  const reactions = {
    like: "👍",
    love: "❤",
    punk: "🤟",
    peace: "✌",
  };
  // console.log(Object.entries(reactions));

  const renderedPosts = posts.map((post) => {
    const author = users.find((user) => user.id === post.userId);
    // console.log(author);
    return (
      <article key={post.id}>
        <h2>{post.title}</h2>
        <p>{post.body.substring(0, 100)}</p>
        <p>
          <span>By {author ? author.name : "Unknown user"}</span>
        </p>
        <p>
          <span>Published Date: {post.date}</span>
        </p>
        {Object.entries(reactions).map(([name, emoji]) => (
          <span>
            <span
              onClick={() =>
                dispatch(addReactionCount({ postId: post.id, reaction: name }))
              }
              style={{ cursor: "pointer" }}
            >
              {emoji}
            </span>
            <span>{post.reactions[name]}</span>{" "}
          </span>
        ))}
      </article>
    );
  });
  return <>{renderedPosts}</>;
};

export default PostContent;
