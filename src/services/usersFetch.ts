import { User } from "@/type/Users";

export async function fetchUsers(): Promise<User[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_TODO_API_BASE_URL}/users`,
      {
        cache: "no-store",
      },
    );
    const data: User[] = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export const deleteUser = async (id: string): Promise<void> => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_TODO_API_BASE_URL}/users/${id}`, {
      method: "DELETE",
      cache: "no-store",
    });
  } catch (error) {
    console.error("Error deleting Users:", error);
  }
};

export async function postUser(user: Omit<User, "id">): Promise<User | null> {
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

export async function fetchUser(id: string): Promise<User | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_TODO_API_BASE_URL}/users/${id}`,
      {
        method: "GET",
        cache: "no-store",
      },
    );
    return await res.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return null; // Return null or an empty object as a fallback
  }
}
