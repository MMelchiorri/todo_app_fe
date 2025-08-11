import { fetchUsers } from "@/services/usersFetch";
import { User } from "@/type/Users";
import TableEmpty from "@/sections/users/tableDataEmpty";
import UsersTable from "@/sections/users/usersTable";
export default async function UsersPage() {
  const users: User[] = await fetchUsers();

  if (!users || users.length === 0) {
    return <TableEmpty />;
  }

  return <UsersTable users={users} />;
}
