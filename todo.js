const toDoForm = document.querySelector('.todo__form');
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.querySelector('.todo__list');
let tasksArray = [];

const TO_DO_TASKS_LOCAL_STORAGE = 'todos';

function loadToDoTasks() {
    const loadedToDoTasks = localStorage.getItem(TO_DO_TASKS_LOCAL_STORAGE);
    if (loadedToDoTasks !== null) {
        const parseToDoTasks = JSON.parse(loadedToDoTasks);
        parseToDoTasks.forEach( (task) => {showToDoTasks(task.name)} );
    }
}

function saveToDoTasks() {
    localStorage.setItem(TO_DO_TASKS_LOCAL_STORAGE, JSON.stringify(tasksArray) );
}

function deleteTask(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanTasksArray = tasksArray.filter ( (task) => task.id !== parseInt(li.id) );
    tasksArray = cleanTasksArray;
    saveToDoTasks(); 
}

function showToDoTasks(task) {
    const li = document.createElement('li');
    li.classList.add('todo__item');
    const btnDelete = document.createElement('button');
    btnDelete.classList.add('todo__btn');
    const span = document.createElement('span');
    span.classList.add('todo__text');

    btnDelete.innerHTML = 'X';
    span.innerText = task;
    li.appendChild(btnDelete);
    li.appendChild(span);
    toDoList.appendChild(li);

    const newId = tasksArray.length + 1;
    li.id = newId;
    const taskObject = {
        name: task,
        id: newId,
    }
    tasksArray.push(taskObject);
    saveToDoTasks();

    btnDelete.addEventListener('click', deleteTask);
}

function submitHandler(event) {
    event.preventDefault();
    const currentTask = toDoInput.value;
    showToDoTasks(currentTask);
    toDoInput.value = "";
}

function init() {
    loadToDoTasks();
    toDoForm.addEventListener('submit', submitHandler);
}

init();

