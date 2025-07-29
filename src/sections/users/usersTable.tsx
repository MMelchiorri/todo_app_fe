import { Users } from "@/type/Users";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { getTranslations } from "next-intl/server";
import dayjs from "dayjs";
import Link from "next/link";
import DeleteButton from "@/sections/todos/DeleteButton";
import { FileSearch } from "lucide-react";

type UsersTableProps = {
  users: Users[];
};

const excludedKeys: (keyof Users | string)[] = [
  "__v",
  "_id",
  "createdAt",
  "updatedAt",
  "password",
  "isActive",
  "updatedAt",
  "jobAssigned",
];
const keysToDisplay = (user: Users): (keyof Users)[] => {
  return Object.keys(user).filter(
    (key) => !excludedKeys.includes(key),
  ) as (keyof Users)[];
};

export default async function UsersTable(props: UsersTableProps) {
  const { users } = props;
  if (!users || users.length === 0) {
    return <div>No users to display</div>;
  }
  const t = await getTranslations("Users");
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
              <TableCell key={key}>{t(`columns.${key}`)}</TableCell>
            ))}
            {Array(2)
              .fill(null)
              .map((_, i) => (
                <TableCell key={`extra-${i}`} />
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              {keys.map((key) => (
                <TableCell key={key}>
                  {typeof user[key] === "string" && dayjs(user[key]).isValid()
                    ? dayjs(user[key]).format("DD/MM/YYYY")
                    : user[key]?.toString()}
                </TableCell>
              ))}
              <TableCell sx={{ textAlign: "center" }}>
                <DeleteButton id={user.id} />
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <FileSearch id={user.id} />
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell
              colSpan={keys.length + 2}
              sx={{
                textAlign: "center",
                paddingTop: 24,
                paddingBottom: 24,
                py: 3,
              }}
            >
              <Button variant="contained">
                <Link
                  href="/users/create"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  {t("actions.add")}
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
