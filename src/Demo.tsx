import { useMutation, useQuery, useQueryClient } from "react-query";
import { addTodo, fetchTodos } from "./api";
import TodoCard from "./components/TodoCard";
import { useState } from "react";

const Demo = () => {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const { data: todos, isLoading } = useQuery({
    queryFn: () => fetchTodos(search),
    queryKey: [
      "todos",
      {
        search,
      },
    ],
    staleTime: Infinity,
    cacheTime: 0,
  });

  const { mutateAsync: addTodoMutation } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <button
        onClick={async () => {
          try {
            await addTodoMutation({ title });
            setTitle("");
          } catch (e) {
            console.error(e);
          }
        }}
      >
        Add
      </button>
      {todos?.map((todo) => {
        return <TodoCard key={todo.id} todo={todo} />;
      })}
    </div>
  );
};

export default Demo;
