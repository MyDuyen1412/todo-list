export const getTodoList = () => JSON.parse(localStorage.getItem("todoList") || "[]");


export const addTodo = (todoList, newTodo) => {
  return new Promise((resolve, reject) => {
    todoList = [...todoList, newTodo];
    resolve(todoList);
  });
};

