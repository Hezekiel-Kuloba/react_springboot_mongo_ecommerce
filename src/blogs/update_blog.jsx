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
          <h1 style={{ color: "#3B71CA" }}>
            React, Spring Boot, MongoDb Ecommerce
          </h1>
        </div>
        <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
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
        <div>
          <h3>0r</h3>
        </div>
        <div>
          <Button className="authButton" variant="contained" color="primary">
            <Link to="/sign_in">Login</Link>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;
