import React, { useState } from "react";

import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { addPost } from "./postsSlice";

const AddPostForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onSavePost = (e) => {
    e.preventDefault();
    if (title && content) {
      dispatch(addPost(title, content)); // instead of sending data in our global state form {id,title,content} we can dispatch/send data as it is and prepare() of slice will take care of preparing the data shape we need,so our component dont have to know and dont care about global state shape
      setTitle("");
      setContent("");
    }
  };

  return (
    <section>
      <form>
        <div>
          <label htmlFor="title">Title</label>
          <input name="title" type="text" id="title" onChange={onTitleChange} />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id="content"
            cols="30"
            rows="3"
            onChange={onContentChange}
          />
        </div>

        <button onClick={onSavePost}>Save post</button>
      </form>
    </section>
  );
};

export default AddPostForm;
