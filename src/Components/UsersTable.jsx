import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  TableSortLabel,
} from "@mui/material";
import { useEffect, useState } from "react";

function UsersTable({ users, setUsers }) {
  const [selectAll, setSelectAll] = useState(false);

  const usersInOrder = [...users].sort((a, b) =>
    a.email.localeCompare(b.email)
  );

  useEffect(() => {
    const allSelected = users.every((user) => user.selected);
    setSelectAll(allSelected);
  }, [users]);

  function handleSelected(id) {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, selected: !user.selected } : user
      )
    );
  }

  function handleSelectAll() {
    setUsers((prevUsers) =>
      prevUsers.map((user) => ({
        ...user,
        selected: !selectAll,
      }))
    );
    setSelectAll(!selectAll);
  }

  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                checked={selectAll}
                onChange={() => handleSelectAll()}
              />
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>
              <TableSortLabel active={true} direction="desc">
                Email
              </TableSortLabel>
            </TableCell>
            <TableCell>Last Login</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersInOrder.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Checkbox
                  checked={user.selected}
                  onChange={() => handleSelected(user.id)}
                />
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.lastLogin}</TableCell>
              <TableCell>{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UsersTable;
