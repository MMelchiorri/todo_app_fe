import { fetchUsers } from "@/services/usersFetch";
import TableEmpty from "@/sections/users/tableDataEmpty";
import UsersTable from "@/sections/users/usersTable";
export default async function UsersPage() {
  const users = await fetchUsers();

  if (!users || users.length === 0) {
    return <TableEmpty />;
  }

  return <UsersTable users={users} />;
}
