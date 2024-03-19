import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import {
  Button,
  Container,
  Dialog,
  DialogTitle,
  Link,
  TextField,
  Typography,
} from "@mui/material";

const Home = () => {
  const [userData, setUserData] = React.useState([]);
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  React.useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getAllUsers");
      setUserData(response.data.allUser);
      console.log("user", response);
    } catch (error) {
      console.error("Error user:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.get(`http://localhost:3000/deletUser/${id}`);
      alert("Deleted Successfully");
    } catch (error) {
      console.error("Error user:", error);
    }
  };

  const updateUser = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/getUser/${id}`);
      setOpen(true);
      setEmail(response.data.user.email);
      setName(response.data.user.name);
      console.log("login", response.data.user);
    } catch (error) {
      console.error("Error registering user:", error);
    }
    setUserId(id);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = {
        name: name,
        email: email,
      };
      const response = await axios.post(
        `http://localhost:3000/updateUser/${userId}`,
        userData
      );
      alert("Updated Successfully");
      getUser()
      setOpen(false);
      console.log("login", response.data);
    } catch (error) {
      alert("Login Failed");
      console.error("Error registering user:", error);
    }
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <>
      <Container>
        <Link href="/login">Login</Link>/<Link href="/register">Register</Link>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData?.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <Button onClick={() => updateUser(user._id)}>Update</Button>
                    <Button onClick={() => deleteUser(user._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Dialog open={open}>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 'auto',
            padding: '2rem',
          }}
        >
          <Typography>Update User</Typography>
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
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="large"
              style={{ marginTop: "1rem" }}
            >
              Update
            </Button>
            <Button
              variant="contained"
              size="large"
              style={{ marginTop: "1rem", marginLeft: "1rem" }}
              onClick={handleClose}
            >
              Cancle
            </Button>
          </form>
        </Container>
      </Dialog>
    </>
  );
};

export default Home;
