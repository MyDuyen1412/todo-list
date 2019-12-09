export const getTodoList = () =>
  JSON.parse(localStorage.getItem("todoList") || "{}");

export const setTodoList = list =>
  localStorage.setItem("todoList", JSON.stringify(list));

export const getTodoNotPin = () => {
  const todos = getTodoList();
  return Object.values(todos)
    .reverse()
    .filter(item => !item.pin);
};

export const getTodoPin = () => {
    const todos = getTodoList();
    return Object.values(todos)
      .reverse()
      .filter(item => item.pin);
  };
