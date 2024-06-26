import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import "../styles.css";
import { Link, useParams } from "react-router-dom";


const UpdateTask = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);
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
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://profiletasks.sandbox.co.ke:8989/task/update",
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
        console.log("task updated successful:", data);
        // Handle successful registration, e.g., redirect to login page
        // Store the user data in session storage
      } else {
        console.error("task updating failed:", response.status);
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
      {/* Add any other task details you want to display */}
    </div>
        <div>
          <TextField
            style={{ marginBottom: 20 }}
            className="auth_text_field"
            type="text"
            label="New task title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <TextField
            style={{ marginBottom: 20 }}
            className="auth_text_field"
            type="text"
            label="New task content"
            value={task}
            onChange={(event) => setTask(event.target.value)}
          />
        </div>
        <div>
          <Button
            className="authButton"
            type="submit"
            variant="contained"
            color="primary"
          >
            Update task
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

export default UpdateTask;
