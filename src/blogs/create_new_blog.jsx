import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import "../styles.css";
import { Link } from "react-router-dom";

const CreateNewBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAccessToken(user.token);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(accessToken);
    try {
      const response = await fetch(
        "http://profiletasks.sandbox.co.ke:8989/blog/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            title: title,
            content: content,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Blog created successful:", data);
        // Handle successful registration, e.g., redirect to login page
        // Store the user data in session storage
      } else {
        console.error("Blog creation failed:", response.status);
        // Handle registration failure, e.g., display an error message
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <form className="authForm" onSubmit={handleSubmit}>
        <div>
          <h1 style={{ color: "#3B71CA" }}>
            React, Spring Boot, MongoDb Ecommerce
          </h1>
        </div>
        <div>
          <TextField
            style={{ marginBottom: 20 }}
            className="auth_text_field"
            type="text"
            label="title"  
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextField
            label="Blog Content"
            multiline
            rows={4}
            value={content}
            variant="outlined"
            style={{ width: "100%", marginBottom: "16px" }}
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
            Create
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

export default CreateNewBlog;