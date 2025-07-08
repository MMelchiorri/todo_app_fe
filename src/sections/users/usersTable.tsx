"use client";

import { Users } from "@/type/Users";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

type UsersTableProps = {
  users: Users[];
};

const excludedKeys = ["__v", "_id"];

const keysToDisplay = (user: Users) => {
  return Object.keys(user).filter((key) => !excludedKeys.includes(key));
};

const UsersTable = ({ users }: UsersTableProps) => {
  if (!users || users.length === 0) {
    return <div>No users to display</div>;
  }

  const keys = keysToDisplay(users[0]);

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: 900,
        mx: "auto",
        my: 6,
        p: 2,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {keys.map((key) => (
              <TableCell key={key}>{key}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              {keys.map((key) => (
                <TableCell key={key}>{user[key as keyof Users]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
