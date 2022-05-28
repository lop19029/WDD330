import TodosController from "./todos-controller";

const myTodosController = new TodosController('todosDisplayList');
window.addEventListener('load', () => {
    myTodosController.showTodosList();
});