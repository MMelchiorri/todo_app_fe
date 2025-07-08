"use client";

import { Users } from "@/type/Users";
import {
  Table,
  TableBody,
  TableCell,
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
    <div>
      <h1>User List</h1>
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
    </div>
  );
};

export default UsersTable;
