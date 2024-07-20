import { useEffect, useState } from "react";
import UsersTable from "../Components/UsersTable";
import { Box, Typography } from "@mui/material";
import { getUsers } from "../api/users";
import { useAuth } from "../Context/AuthContext";
import { auth } from "../config/firebase";
import ActionButtons from "../Components/ActionButtons";

function Home() {
  const [users, setUsers] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const unsubscribe = getUsers(setUsers);

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!(users.length > 0)) return;
    if (!currentUser) return;
    const userData = users.find((user) => user.id === currentUser.uid);
    if (userData && userData.status === "Blocked") {
      auth.signOut();
    }
  }, [users, currentUser]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <ActionButtons users={users} />
      <UsersTable users={users} setUsers={setUsers} />
    </Box>
  );
}

export default Home;
