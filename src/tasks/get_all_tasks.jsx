import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
} from "@mui/material";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

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
         // Redirect to the task list page
         window.location.reload();
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div>
          <h2 style={{ color: "#3B71CA" }}>Task List</h2>
        </div>
      <div>
        <TextField
          type="text"
          placeholder="Search tasks..."
          value={searchText}
          onChange={handleSearch}
          style={{ width: "450px", marginBottom: "16px" }}

        />
      </div>
      <div style={{ width: "100%" }}>
        <div>
          <TableContainer component={Paper} style={{ width: "100%" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel>Title</TableSortLabel>
                  </TableCell>
                  <TableCell>Task</TableCell>
                  <TableCell style={{ textAlign: "center" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((atask) => (
                  <TableRow key={atask.id}>
                    <TableCell>{atask.title}</TableCell>
                    <TableCell>{atask.content}</TableCell>
                    <TableCell>
                      <button
                        style={{ marginRight: "16px" }}
                        onClick={() => handleViewtask(atask.id)}
                      >
                        View
                      </button>
                      <button
                        style={{ marginRight: "16px" }}
                        onClick={() => handleDeleteTask(atask.id)}
                      >
                        Delete
                      </button>
                      <button onClick={() => handleUpdatetask(atask.id)}>
                        Update
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
