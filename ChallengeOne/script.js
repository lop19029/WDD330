window.onload = loadAllTodos();
var activeTodos;

function loadAllTodos(){
    activeTodos = 0;
    let todos;
    if(localStorage.getItem("todos") == null){
        todos = [];
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    loadTodos(todos)
}

function loadActiveTodos() {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let activeTodos = todos.filter(todo => todo.completed == false);
    loadTodos(activeTodos);
}

function loadCompletedTodos(){
    let todos = JSON.parse(localStorage.getItem("todos"));
    let completedTodos = todos.filter(todo => todo.completed == true);
    loadTodos(completedTodos);
}

//Filter todos using radio buttons
var rad = document.filters.filter;
for (var i = 0; i < rad.length; i++) {
    rad[i].addEventListener('change', event => {
        switch(event.target.value){
            case "active":
                loadActiveTodos();
                break;
            case "completed":
                loadCompletedTodos();
                break;
            default:
                loadAllTodos();
        }
    });
}

function loadTodos(todos) {
    //Clean list
    const list = document.querySelector("ul");
    list.innerHTML="";
    activeTodos = 0;
    
    // Loop through todos and add them to the list
    todos.forEach(todo => {
        //Count active todos
        if(!todo.completed){
            activeTodos+=1;
        }
        const li = document.createElement("li");
        li.innerHTML = `<div class = "listItem">
                            <input type="checkbox" onclick="checkTodoComplete(this)" ${todo.completed ? 'checked' : ''}>
                            <input value="${todo.todo}" class="userInput todo${todo.completed ? '-completed' : ''}" readonly>
                            <input class="removeBtn" onclick="removeTodo(this)" type="button" value="X">
                        </div>`;
        list.insertBefore(li, list.children[0]);
    });

    updateTodosLeft()
}

function updateTodosLeft(){
    document.getElementById("activeTodosLeft").innerHTML = activeTodos;
}

function addTodo() {
    const todo = document.querySelector(".inputForm input");
    const list = document.querySelector("ul");
    // Return if todo is empty
    if (todo.value === "") {
      alert("Please add some task!");
      return false;
    }
    // Check is todo already exist
    let todos = JSON.parse(localStorage.getItem("todos"));
    // Task already exist
    todos.forEach(task => {
      if (task.name === todo.value) {
        alert("Task already exist!");
        todo.value = "";
        return;
      }
    });
  
    // Add todo to local storage
    localStorage.setItem("todos", JSON.stringify([...JSON.parse(localStorage.getItem("todos") || "[]"), { todo: todo.value, completed: false }]));
  
    // Create list item, add innerHTML and append to ul
    const li = document.createElement("li");

    li.innerHTML = `<div class = "listItem">
                        <input type="checkbox" onclick="checkTodoComplete(this)">
                        <input value="${todo.value}" class="userInput todo" readonly>
                        <input class="removeBtn" onclick="removeTodo(this)" type="button" value="X">
                    </div>`;
    list.insertBefore(li, list.children[0]);
    
    // Clear input
    todo.value = "";

    // Update active todos
    activeTodos++;
    updateTodosLeft();
}

function checkTodoComplete(event) {
    let todos = Array.from(JSON.parse(localStorage.getItem("todos")));
    todos.forEach(todo => {
      if (todo.todo === event.nextElementSibling.value) {
        todo.completed = !todo.completed;
        // Update tasks left
        todo.completed ? activeTodos-- : activeTodos++;
        updateTodosLeft();
      }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
    event.nextElementSibling.classList.toggle("todo-completed");   
}

function removeTodo(event) {
  let todos = Array.from(JSON.parse(localStorage.getItem("todos")));
  todos.forEach(todo => {
    if (todo.todo === event.parentNode.children[1].value) {
      // Delete task
      todos.splice(todos.indexOf(todo), 1);
      // Update tasks left
      todo.completed ? '' : activeTodos--;
      updateTodosLeft();
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  event.parentElement.remove();
}