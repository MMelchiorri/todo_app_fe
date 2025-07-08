import { Users } from "@/type/Users";

export async function fetchUsers(): Promise<Users[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_TODO_API_BASE_URL}/users`,
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

export async function postUser(user: Omit<Users, "id">): Promise<Users | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_TODO_API_BASE_URL}/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        cache: "no-store",
      },
    );
    return await res.json();
  } catch (error) {
    console.error("Error posting user:", error);
    return null;
  }
}
