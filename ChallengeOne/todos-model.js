var todoListJson = localStorage.getItem('todos');
var todoList = [];

if(todoListJson != null){
    todoList = Array.from(JSON.parse(todoListJson));
}

class TodosModel {
    getAllTodos(){
        return todoList;
    }
    getActiveTodos(){
        return todoList.filter(todo => todo.active == true);
    }
    getCompletedTodos(){
        return todoList.filter(todo => todo.active == false);
    }
    saveNewTodo(todo){
        todoList.push(todo);
        localStorage.setItem('todos', todoList);
    }
}

export default TodosModel;