import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { updateLastLogInUser } from "../api/users";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const formFields = getFormFields(event.currentTarget);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formFields.email,
        formFields.password
      );
      await updateLastLogInUser(userCredential.user);
      setError("");
      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          {error !== "" && (
            <Typography component="p" sx={{ color: "red" }}>
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Typography variant="body2" color="primary">
                Don&apos;t have an account? Sign Up
              </Typography>
            </Link>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

function getFormFields(form) {
  const formData = new FormData(form);
  return Object.fromEntries(formData.entries());
}

export default Login;
