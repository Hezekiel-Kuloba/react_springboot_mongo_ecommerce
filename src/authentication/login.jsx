import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom';

import "../styles.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch("http://profiletasks.sandbox.co.ke:8989/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        // Store user data in session storage
        sessionStorage.setItem("user", JSON.stringify(data));
        // Redirect to homepage
        navigate("/home");
        console.log("Login successful:", data);
        // Handle successful registration, e.g., redirect to login page
      } else {
        console.error("Login failed:", response.status);
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
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
