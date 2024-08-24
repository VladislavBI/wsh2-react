import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { SelectTotalTodos, removeTodo, selectAllTodos, toggleTodo, addTodo } from "./todoSlice";

const Todo: React.FC = () => {
    const [todoTitle, setTodoTitle] = useState('');
    const todos = useAppSelector(selectAllTodos);
    const todosCount = useAppSelector(SelectTotalTodos);
    const dispatch = useAppDispatch();

    const handleAddTodo = (id: string) => {
        dispatch(addTodo(
            {
                id: String("id temp" + todoTitle),
                title: todoTitle,
                completed: false,
            }
        ));
    };


    const handleRemoveTodo = (id: string) => {
        dispatch(removeTodo(id));
    };

    const handleToggleTodo = (id: string) => {
    dispatch(toggleTodo(
        { id, 
            changes: { 
                completed: !todos.find(todo => todo.id === id)?.completed 
            } 
        }));
    };
    

    return(
    <>
        <h1>Todo list</h1>
        <input
        type="text"
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
        placeholder="New to-do"
      />
      <button onClick={handleAddTodo}>Add To-Do</button>
        <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => handleToggleTodo(todo.id)}
            >
              {todo.title}
            </span>
            <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
          </li>
        ))}
        </ul>
        Total: {todosCount}
    </>);
}

export default Todo;

