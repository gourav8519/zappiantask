import { Button, Container, Link, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = {
        email: email,
        password: password,
      };
      const response = await axios.post(
        "http://localhost:3000/login",
        userData
      );
      alert("Login Successfully");
      console.log("login", response.data);
    } catch (error) {
      alert("Login Failed");
      console.error("Error registering user:", error);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "10%",
      }}
    >
      <Typography>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          size="large"
          style={{ marginTop: "1rem" }}
        >
          Login
        </Button>
      </form>
      <Link href="/register">Register</Link>
      <Link href="/">All Users</Link>
    </Container>
  );
};

export default Login;
