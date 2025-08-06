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
const hiddenOnMobile: (keyof User | string)[] = ["email", "phone"]; // Nascondi queste colonne su XS

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

  return (
    <TableContainer
      component={Paper}
      sx={{
        mx: "auto",
        my: 6,
        px: 1,
        width: "100%",
        overflowX: "hidden",
        borderRadius: 2,
        boxShadow: 3,
        "@media (max-width:769px)": {
          width: "90%",
        },
      }}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            {keys.map((key) => (
              <TableCell
                key={key}
                sx={{
                  fontWeight: "bold",
                  fontSize: {
                    xs: "0.75rem",
                    sm: "0.875rem",
                    md: "1rem",
                  },
                  display: {
                    xs: hiddenOnMobile.includes(key) ? "none" : "table-cell",
                  },
                  whiteSpace: "nowrap",
                }}
              >
                {t(`columns.${key}`)}
              </TableCell>
            ))}
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              {keys.map((key) => (
                <TableCell
                  key={key}
                  sx={{
                    fontSize: {
                      xs: "0.75rem",
                      sm: "0.875rem",
                      md: "1rem",
                    },
                    display: {
                      xs: hiddenOnMobile.includes(key) ? "none" : "table-cell",
                    },
                    whiteSpace: "nowrap",
                    maxWidth: 140,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {typeof user[key] === "string" && dayjs(user[key]).isValid()
                    ? dayjs(user[key]).format("DD/MM/YYYY")
                    : user[key]?.toString()}
                </TableCell>
              ))}
              <TableCell sx={{ textAlign: "center", whiteSpace: "nowrap" }}>
                <DeleteButton id={user._id} />
              </TableCell>
              <TableCell sx={{ textAlign: "center", whiteSpace: "nowrap" }}>
                <DetailButton id={user._id} />
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell
              colSpan={keys.length + 2}
              sx={{
                textAlign: "center",
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
