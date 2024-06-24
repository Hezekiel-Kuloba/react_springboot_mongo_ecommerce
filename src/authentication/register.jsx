import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import "../styles.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log("Registration submitted:", data);
  };

  return (
    <div>
      <form  className="authForm" onSubmit={handleSubmit(onSubmit)}>
        <div>
            <h1 style={{color:'#3B71CA'}}>React, Spring Boot, MongoDb Ecommerce</h1>
        </div>
        <div>
          <TextField style={{marginBottom: 20}} className="auth_text_field"
            type="text"
            label="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            error={!!errors.username}
            helperText={errors.username?.message}
            variant="outlined"
          />
        </div>
        <div>
          <TextField style={{marginBottom: 20}} className="auth_text_field" 
            type="email"
            label="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={!!errors.email}
            helperText={errors.email?.message}
            variant="outlined"
          />
        </div>
        <div>
          <TextField style={{marginBottom: 20}} className="auth_text_field"
            type="password"
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={!!errors.password}
            helperText={errors.password?.message}
            variant="outlined"
          />
        </div>
        <div>
          <TextField style={{marginBottom: 20}} className="auth_text_field"
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            variant="outlined"
          />
        </div>
        <div>
          <Button className="authButton" type="submit" variant="contained" color="primary">
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
