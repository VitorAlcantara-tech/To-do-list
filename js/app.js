// Seleção de elementos
const todoForm = document.querySelector('#todo__form');
const todoInput = document.getElementById('todo__input');
const todoList = document.querySelector('#todo__list');
const editForm = document.querySelector('#edit__form');
const editInput = document.querySelector('#edit__input');
const cancelEditBtn = document.querySelector('#cancel__edit__btn');
const filtrar = document.getElementById("filter__select");
const searchInput = document.getElementById('search__input');
const eraseBtn = document.getElementById('erase__btn');

let oldInputValue;
//Funções
const saveTodo = (text) => {
    const todo = document.createElement('div');
    todo.classList.add('todo');

    const todoTitle = document.createElement('h3');
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish__todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBnt = document.createElement("button");
    editBnt.classList.add("edit__todo");
    editBnt.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBnt);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove__todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();
};

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const updateTodo = (text) =>{
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text;
        }
    });
};


// Eventos
todoForm.addEventListener("submit", (e) =>{
    e.preventDefault();

    const inputValue = todoInput.value;

    if(inputValue){
        saveTodo(inputValue);
    }
});

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest('div');
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText
    }

    if(targetEl.classList.contains("finish__todo")){
        parentEl.classList.toggle("done");
    }

    if(targetEl.classList.contains("remove__todo")){
        parentEl.remove();
    }

    if (targetEl.classList.contains("edit__todo")){
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
});

cancelEditBtn.addEventListener("click", (e)=> {
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener("submit", (e) =>{
    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue){
        updateTodo(editInputValue);
    }

    toggleForms()
});

filtrar.addEventListener('change', (e) =>{
    e.preventDefault();
    
    let optionValue = filtrar.value;
    let todos = document.querySelectorAll("#todo__list .todo");
    
     todos.forEach(todo => {
        
        switch (optionValue) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'done':
                if (todo.classList.contains('done')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'todo':
                if (!todo.classList.contains('done')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
});

searchInput.addEventListener('input', (e) =>{
    e.preventDefault();

    const searchText = searchInput.value.toLowerCase();
    const todos = document.querySelectorAll('#todo__list .todo');

    todos.forEach(todo => {
        const todoTitle = todo.querySelector('h3').innerText.toLowerCase();

        if (todoTitle.includes(searchText)){
            todo.style.display = 'flex';
        } else {
            todo.style.display = 'none';
        }
    });
});

eraseBtn.addEventListener('click', (e) => {
    e.preventDefault();

    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
    searchInput.focus();
})