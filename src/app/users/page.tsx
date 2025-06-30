import { fetchUsers } from "@/services/usersFetch";
import TableEmpty from "@/sections/users/tableDataEmpty";
export default async function UsersPage() {
  const users = await fetchUsers();

  if (!users || users.length === 0) {
    return <TableEmpty />;
  }

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
