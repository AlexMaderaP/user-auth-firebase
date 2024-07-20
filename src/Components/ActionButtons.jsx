import BlockIcon from "@mui/icons-material/Lock";
import UnblockIcon from "@mui/icons-material/LockOpen";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button } from "@mui/material";
import { updateUserStatus } from "../api/users";
import { useAuth } from "../Context/AuthContext";
import { deleteUserById } from "../api/users";

function ActionButtons({ users }) {
  const { currentUser } = useAuth();

  async function handleBlock() {
    const usersToBlock = users
      .filter((user) => user.selected)
      .map((user) => user.id);

    await updateUserStatus(usersToBlock, "Blocked");
  }

  async function handleUnblock() {
    const usersToUnblock = users
      .filter((user) => user.selected)
      .map((user) => user.id);

    await updateUserStatus(usersToUnblock, "Active");
  }

  async function handleDelete() {
    await deleteUserById(currentUser);
  }
  return (
    <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
      <Button
        variant="contained"
        color="inherit"
        startIcon={<BlockIcon />}
        onClick={handleBlock}
      >
        Block
      </Button>
      <Button
        variant="contained"
        color="inherit"
        startIcon={<UnblockIcon />}
        onClick={handleUnblock}
      >
        Unblock
      </Button>
      <Button
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={handleDelete}
      >
        Delete Myself
      </Button>
    </Box>
  );
}

export default ActionButtons;
