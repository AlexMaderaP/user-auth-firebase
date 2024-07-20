import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h1" component="div">
        404
      </Typography>
      <Typography variant="h5" component="div">
        Page not found
      </Typography>
      <Button variant="contained" component={Link} to="/" sx={{ mt: 3 }}>
        Go Home
      </Button>
    </Box>
  );
}

export default NotFound;
