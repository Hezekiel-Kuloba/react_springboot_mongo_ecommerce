import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    console.log(storedUser);
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAccessToken(user.token);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  useEffect(() => {
    let timeout;

    const searchtasks = async () => {
      if (!accessToken) return;

      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        };
        const response = await fetch(
          "http://profiletasks.sandbox.co.ke:8989/task/search",
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
              text: searchText,
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          console.error("Error fetching tasks:", response.status);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      searchtasks();
    }, 500);

    return () => clearTimeout(timeout);
  }, [accessToken, searchText]);

  useEffect(() => {
    const fetchtasks = async () => {
      if (!accessToken) return;

      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        };
        const response = await fetch(
          "http://profiletasks.sandbox.co.ke:8989/task/get-all",
          {
            method: "POST",
            headers: headers,
          }
        );
        // console.log(response);
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          console.error("Error fetching tasks:", response.status);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchtasks();
  }, [accessToken]);

  const handleDeleteTask = async (id) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await fetch(
        `http://profiletasks.sandbox.co.ke:8989/task/delete`,
        {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
              id: id,
            }),
        }
      );

      if (response.ok) {
        console.log("task deleted successfully");
        navigate("/tasks"); // Redirect to the task list page
      } else {
        console.error("Error deleting task:", response.status);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleViewtask = (id) => {
    navigate(`/one_task/${id}`);
  };

  const handleUpdatetask = (id) => {
    navigate(`/task_update/${id}`);
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div>
      <h1>task List</h1>
      <TextField
      type="text"
      placeholder="Search tasks..."
      value={searchText}
      onChange={handleSearch}
      />
      <ul>
        {tasks.map((atask) => (
          <li key={atask.id}>
            <h3>{atask.title}</h3>
            <p>{atask.task}</p>
            <button onClick={() => handleViewtask(atask.id)}>View task</button>
            <button onClick={() => handleDeleteTask(atask.id)}>Delete task</button>
            <button onClick={() => handleUpdatetask(atask.id)}>Update task</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
