import moment from "moment";
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, selectAllUsers } from "../users/usersSlice";
import { addNewPost, addPost } from "./postsSlice";

const AddPostForm = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  // console.log(users);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onAuthorChange = (e) => setUserId(e.target.value);

  const usersOptions = users.map((user, index) => (
    <>
      <option key={index} value={user.id}>
        {user.name}
      </option>
    </>
  ));

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onSavePost = (e) => {
    e.preventDefault();
    const date = moment(Date.now()).fromNow();
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        // dispatch(addPost(title, content, userId, moment(date).fromNow()));
        dispatch(addNewPost({ title, body: content, userId, date })).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
      } catch (error) {
        console.error("Failed to save the post", error);
      } finally {
        setAddRequestStatus("idle");
      }
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
            <option value="" selected={true} disabled={true}></option>
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
