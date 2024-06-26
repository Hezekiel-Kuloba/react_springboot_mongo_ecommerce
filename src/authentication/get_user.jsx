import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

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
      <div>
          <h2 style={{ color: "#3B71CA" }}>
            User List
          </h2>
        </div>
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>
                <button onClick={() => handleUpdateUser(user.id)}>Update User</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      {/* <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>{user.firstName}</p>
            <p>{user.lastName}</p>
            <p>{user.email}</p>
            <p>{user.phoneNumber}</p>
            <button onClick={() => handleUpdateUser(user.id)}>Update User</button>
          </li>
          
        ))}
      </ul> */}
    </div>
  );
};

export default UserList;
