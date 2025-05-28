import {fetchTodos} from "@/services/todoFetch";
export default async function Home() {
  const todo = await fetchTodos()
  console.log(todo);
  return (
    <div >

    </div>
  );
}
