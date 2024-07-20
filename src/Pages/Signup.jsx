import {
  Box,
  TextField,
  Button,
  Link,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { setUser } from "../api/users";

function Signup() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const formFields = getFormFields(event.currentTarget);
      if (formFields.password !== formFields.confirmPassword) {
        setError("Passwords must match!");
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formFields.email,
        formFields.password
      );
      const user = userCredential.user;
      await setUser(formFields.name, user);
      navigate("/");
      setError("");
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
            Sign Up
          </Typography>
          {error !== "" && (
            <Typography component="p" sx={{ color: "red" }}>
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              type="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Link href="/login" variant="body2">
              {"Already have an account? Log In"}
            </Link>
          </form>
        </Box>
      </Paper>
    </Container>
  );
}

export default Signup;

function getFormFields(form) {
  const formData = new FormData(form);
  return Object.fromEntries(formData.entries());
}
