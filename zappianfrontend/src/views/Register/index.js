import { Button, Container, Link, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = {
        name: name,
        email: email,
        password: password,
      };
      const response = await axios.post(
        "http://localhost:3000/register",
        userData
      );
      console.log("login", response.data);
      alert("Register Successfully");
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
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
      <Typography>Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={handleNameChange}
        />
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
          Register
        </Button>
      </form>
      <Link href="/login">Login</Link>
      <Link href="/">All Users</Link>
    </Container>
  );
};

export default Register;
