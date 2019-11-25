export const getTodoList = () =>
  JSON.parse(localStorage.getItem("todoList") || "[]");
