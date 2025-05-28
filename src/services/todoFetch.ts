// services/todoService.ts
import axios from "axios";
import {Todo} from '@/type/Todo'

export async function fetchTodos(): Promise<Todo[]> {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_TODO_API_BASE_URL}/todos`);
        return response.data;
    } catch (error) {
        console.error("Error fetching todos:", error);
        throw error;
    }
}
