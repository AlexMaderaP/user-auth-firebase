import { Container, Box, Typography, Button } from "@mui/material";
import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h1" component="div" gutterBottom>
          Error
        </Typography>
        <Typography variant="h5" component="div" gutterBottom>
          {"Something went wrong"}
          {process.env.NODE_ENV !== "production" && (
            <>
              <p>{error?.message}</p>
              <p>{error?.stack}</p>
            </>
          )}
        </Typography>
        <Button variant="contained" component={Link} to="/" sx={{ mt: 3 }}>
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default Error;
