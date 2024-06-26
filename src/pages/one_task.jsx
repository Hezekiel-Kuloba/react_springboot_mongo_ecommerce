import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Task = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
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

 

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 ><span >Task Title: </span>{task.title}</h2>
        <h2 style={{ }}><span>Task Content: </span>{task.content}</h2>
      {/* Add any other task details you want to display */}
    </div>
  );
};

export default Task;
