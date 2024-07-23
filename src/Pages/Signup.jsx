import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../api/users";
import { Link } from "react-router-dom";

function Signup() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      const formFields = getFormFields(event.currentTarget);
      await setUser(formFields.name, formFields.email, formFields.password);
      navigate("/");
      setError("");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
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
              disabled={isLoading}
            >
              Sign Up
            </Button>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Typography variant="body2" color="primary">
                Don&apos;t have an account? Sign Up
              </Typography>
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
