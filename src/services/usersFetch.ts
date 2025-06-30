import { Users } from "@/type/Users";

export async function fetchUsers(): Promise<Users[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_USERS_API_BASE_URL}/users`,
      {
        cache: "no-store",
      },
    );
    const data: Users[] = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
