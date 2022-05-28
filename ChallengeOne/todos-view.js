class TodosView {
    constructor(listElement) {}
    renderTodoList(todoList, listElement) {
        todoList.forEach((todo) => {
        listElement.appendChild(renderOneTodoList(todo));
      });
    }
    renderOneTodoList(todo) {
        var li = document.createElement("li");
        li.innerHTML = `<div class = "${todo.active ? 'activeTodoListItem' : 'completedTodoListItem'}">
                            <input type="hidden" name="id" value="${todo.id}">
                            <input type="checkbox" class = "check${todo.active ? '-false' : '-true'}">
                            <input name="userInput" value="${todo.name}">
                            <input type="button" value="X">
                    </div>`;
    }
  }


  export default TodosView;