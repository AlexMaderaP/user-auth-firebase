import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuth } from "../Context/AuthContext";

const NavLayout = () => {
  const { currentUser } = useAuth();

  function handleLogout() {
    auth.signOut();
  }

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6">Users </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="body1"
              component="span"
              sx={{ marginRight: 1 }}
            >
              {currentUser
                ? `Hello, ${currentUser.email}`
                : "Please Authenticate"}
            </Typography>

            {currentUser ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          marginTop: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "90vh",
          minWidth: "650px",
        }}
      >
        <Outlet />
      </Container>
    </>
  );
};

export default NavLayout;
