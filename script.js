// Selecteurs
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
//Ecouteur
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click",addTodo);
todoButton.addEventListener("click",deleteCheck);
filterOption.addEventListener("input", filterTodo);

// Fonction
function addTodo(event){
    event.preventDefault();
    // Le div
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo"); 
    // Créer le li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // Ajouter la todo au localstorage
    saveLocalTodos(todoInput.value);
    // Button check
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"><i/>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // Button supprimer
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"><i/>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // Ajouter notre TODO
    todoList.appendChild(todoDiv)
    todoInput.value = "";

}

function deleteCheck(e){
    const item = e.target;
    // Delete todo
    if (item.classList[0] ==="trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function (){
            todo.remove();
        })
    } 

    // Check mark
    if (item.classList[0] ==="complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    } 
    
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;    
        }
    })
}

function saveLocalTodos(todo){
    // Checker si il y a des items exixtants
    let todos;
    if (localStorage.getItem("todos")===null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if (localStorage.getItem("todos")===null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){
        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todo"); 
        // Créer le li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        // Button check
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        // Button supprimer
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"><i/>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        // Ajouter notre TODO
        todoList.appendChild(todoDiv);
        
    })
}

function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem("todos")===null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));

}