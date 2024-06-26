import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import "../styles.css";
import { Link, useParams } from "react-router-dom";

const UpdateListUser = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [userId, setUserId] = useState("");

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
        `http://profiletasks.sandbox.co.ke:8989/user/update`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            id: userId,
            firstName: firstname,
            lastName: lastname,
            email: email,
            phoneNumber: phoneNumber,
            password: password,
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
            Update Current User
          </h1>
        </div>
        <div>
          <TextField
            style={{ marginBottom: 20 }}
            className="auth_text_field"
            type="text"
            label="firstname"
            value={firstname}
            onChange={(event) => setFirstname(event.target.value)}
          />
        </div>
        <div>
          <TextField
            style={{ marginBottom: 20 }}
            className="auth_text_field"
            type="text"
            label="lastname"
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
          />
        </div>
        <div>
          <TextField
            style={{ marginBottom: 20 }}
            className="auth_text_field"
            type="email"
            label="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <TextField
            style={{ marginBottom: 20 }}
            className="auth_text_field"
            type="tel"
            label="Phone Number"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </div>
        <div>
          <TextField
            style={{ marginBottom: 20 }}
            className="auth_text_field"
            type="password"
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <Button
            className="authButton"
            type="submit"
            variant="contained"
            color="primary"
          >
            Update User
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

export default UpdateListUser;
