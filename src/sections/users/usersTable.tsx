import { User } from "@/type/Users";
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
import DetailButton from "@/sections/users/DetailButton";

type UsersTableProps = {
  users: User[];
};

const excludedKeys: (keyof User | string)[] = [
  "id",
  "__v",
  "_id",
  "createdAt",
  "updatedAt",
  "password",
  "isActive",
  "updatedAt",
  "jobAssigned",
];
const keysToDisplay = (user: User): (keyof User)[] => {
  return Object.keys(user).filter(
    (key) => !excludedKeys.includes(key),
  ) as (keyof User)[];
};

export default async function UsersTable(props: UsersTableProps) {
  const { users } = props;
  if (!users || users.length === 0) {
    return <div>No users to display</div>;
  }
  const t = await getTranslations("Users");
  const keys = keysToDisplay(users[0]);
  console.log(users);
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
          {users.map((user) => (
            <TableRow key={user.id}>
              {keys.map((key) => (
                <TableCell key={key}>
                  {typeof user[key] === "string" && dayjs(user[key]).isValid()
                    ? dayjs(user[key]).format("DD/MM/YYYY")
                    : user[key]?.toString()}
                </TableCell>
              ))}
              <TableCell sx={{ textAlign: "center" }}>
                <DeleteButton id={user._id} />
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <DetailButton id={user._id} />
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
