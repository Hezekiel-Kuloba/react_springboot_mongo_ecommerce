import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import "../styles.css";
import { Link, useParams } from "react-router-dom";

const UpdateBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    console.log(storedUser);
    // console.log(storedUser.id);
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAccessToken(user.token);
        fetchBlogById(user.token, id);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [id]);

  const fetchBlogById = async (token, id) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await fetch(
        `http://profiletasks.sandbox.co.ke:8989/blog/get`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            id: id,
          }),
        }
      );

      if (response.ok) {
        const dataOne = await response.json();
        setBlog(dataOne);
      } else {
        console.error("Error fetching blog:", response.status);
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://profiletasks.sandbox.co.ke:8989/blog/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            id: id,
            title: title,
            content: content,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Blog updated successful:", data);
        // Handle successful registration, e.g., redirect to login page
        // Store the user data in session storage
        window.location.reload();
      } else {
        console.error("Blog updating failed:", response.status);
        // Handle registration failure, e.g., display an error message
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form className="authForm" onSubmit={handleSubmit}>
        <div>
          <h2 style={{ color: "#3B71CA" }}>Update Blog</h2>
        </div>
        <div>
          <div>
            <h2>
              <span>Task Title: </span>
              {blog.title}
            </h2>
            <h2 style={{}}>
              <span>Task Content: </span>
              {blog.content}
            </h2>
            {/* Add any other task details you want to display */}
          </div>
          {/* Add any other blog details you want to display */}
        </div>
        <div>
          <TextField
            style={{ marginBottom: 20 }}
            className="auth_text_field"
            type="text"
            label="New Blog title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <TextField
            style={{ marginBottom: 20 }}
            className="auth_text_field"
            multiline
            rows={6}
            type="text"
            label="New Blog content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>

        <div>
          <Button
            className="authButton"
            type="submit"
            variant="contained"
            color="primary"
          >
            Update Blog
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;
