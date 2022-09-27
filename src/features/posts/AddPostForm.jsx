import moment from "moment";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { addPost } from "./postsSlice";

const AddPostForm = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  console.log(users);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onAuthorChange = (e) => setUserId(e.target.value);

  const usersOptions = users.map((user, index) => (
    <>
      <option value="" defaultValue={" "} disabled={true}></option>
      <option key={index} value={user.id}>
        {user.name}
      </option>
    </>
  ));

  const onSavePost = (e) => {
    e.preventDefault();
    const date = Date.now();
    if (title && content) {
      dispatch(addPost(title, content, userId, moment(date).fromNow())); // instead of sending data in our global state form {id,title,content} we can dispatch/send data as it is and prepare() of slice will take care of preparing the data shape we need,so our component dont have to know and dont care about global state shape
      setTitle("");
      setContent("");
      setUserId("");
    }
  };

  return (
    <section>
      <h2>Add a new post</h2>
      <form>
        <div>
          <label htmlFor="title">Title</label>
          <br />
          <input
            value={title}
            name="title"
            type="text"
            id="title"
            onChange={onTitleChange}
          />
        </div>

        <div>
          <label htmlFor="author">Author</label>
          <br />
          <select name="author" id="author" onChange={onAuthorChange}>
            {usersOptions}
          </select>
        </div>

        <div>
          <label htmlFor="content">Content</label>
          <br />
          <textarea
            value={content}
            name="content"
            id="content"
            cols="26"
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
