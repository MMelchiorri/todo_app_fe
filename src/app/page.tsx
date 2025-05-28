import { fetchTodos } from "@/services/todoFetch";
import { Todo } from "@/type/Todo";

export default async function Home() {
  const todos: Todo[] = await fetchTodos();

  return (
      <div>
        {todos.map((item) => (
            <div key={item.id} className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-600">{item.description}</p>
              <span
                  className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      item.completed
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                  }`}
              >
            {item.completed ? "Completed" : "Pending"}
          </span>
            </div>
        ))}
      </div>
  );
}
