import TodosModel from "./todos-model";
import TodosView from "./todos-view";

export default class TodosController {
  constructor(parentId) {
    this.parentElement = document.getElementById(parentId);
    this.todosModel = new TodosModel();
    this.todosView = new TodosView(parentId);
  }

  showTodosList() {
    let todosList = this.todosModel.getAllTodos;
    this.todosView.renderTodoList(todosList, this.parentElement);
  }

  addNewTodo() {
      
  }

}
