import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store";

export interface Todo {
    id: string,
    title: string,
    completed: boolean
}

const todosAdapter = createEntityAdapter<Todo>({
    sortComparer:(a,b) => a.title.localeCompare(b.title)
});


export const todoSlice = createSlice({
    name: 'todo',
    initialState: todosAdapter.getInitialState(),
    reducers: {
        removeTodo: todosAdapter.removeOne,
        toggleTodo: todosAdapter.updateOne,
        addTodo: todosAdapter.addOne,
    }
});

export const { removeTodo, toggleTodo, addTodo } = todoSlice.actions;

export const {
    selectAll: selectAllTodos,
    selectById: selectTodoById,
    selectTotal: SelectTotalTodos
} =
todosAdapter.getSelectors((state: RootState) => state.todo)