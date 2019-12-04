export const getTodoList = () => JSON.parse(localStorage.getItem("todoList") || "{}");

export const setTodoList = (list) => localStorage.setItem("todoList", JSON.stringify(list));
