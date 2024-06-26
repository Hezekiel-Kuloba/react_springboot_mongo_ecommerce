import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const navigate = useNavigate()

  const handleUpdateUser = (id) => {
    navigate(`/one_user/${id}`);
  };
  
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

  useEffect(() => {
    const fetchProfile = async () => {
      console.log(accessToken);
      if (!accessToken) return;

      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        };
        const response = await fetch(
          "http://profiletasks.sandbox.co.ke:8989/user/get-all",
          {
            method: "POST",
            headers: headers,
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("Error fetching Profile:", response.status);
        }
      } catch (error) {
        console.error("Error fetching Profile:", error);
      }
    };

    fetchProfile();
  }, [accessToken]);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>{user.firstName}</p>
            <p>{user.lastName}</p>
            <p>{user.email}</p>
            <p>{user.phoneNumber}</p>
            <button onClick={() => handleUpdateUser(user.id)}>Update User</button>
          </li>
          
        ))}
      </ul>
    </div>
  );
};

export default UserList;
