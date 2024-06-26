import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import "../styles.css";
import { Link, useParams } from "react-router-dom";

const UpdateTask = () => {
  const { id } = useParams();
  const [atask, setTask] = useState(null);
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
        fetchTaskById(user.token, id);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [id]);

  const fetchTaskById = async (token, id) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await fetch(
        `http://profiletasks.sandbox.co.ke:8989/task/get`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            id: id,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setTask(data);
      } else {
        console.error("Error fetching task:", response.status);
      }
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

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
        window.location.reload();
      } else {
        console.error("task updating failed:", response.status);
        // Handle registration failure, e.g., display an error message
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (!atask) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form className="authForm" onSubmit={handleSubmit}>
        <div>
          <h2 style={{ color: "#3B71CA" }}>Update Task</h2>
        </div>
        <div>
        <h2 ><span >Task Title: </span>{atask.title}</h2>
        <h2 style={{ }}><span>Task Content: </span>{atask.content}</h2>
        </div>
        <div>{/* Add any other task details you want to display */}</div>
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
            multiline
            value={content}
            rows={6}
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
            Update task
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTask;
