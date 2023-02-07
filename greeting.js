const formSection = document.querySelector('.form-section');
const form = formSection.querySelector('.name-form');
const input = form.querySelector('input');
const greeting = formSection.querySelector('.greeting');


const USER_LOCAL_STORAGE = 'currentUserName';

loadUserName();

function loadUserName() {
    const currentUserName = localStorage.getItem(USER_LOCAL_STORAGE);
    if ( currentUserName === null ) {
        askUserName();
    } else {
        showGreeting(currentUserName);
    }
}

function askUserName() {
    form.classList.add('showing');
    form.addEventListener('submit', submitHandler);
}

function submitHandler(event) {
    event.preventDefault();
    const inputName = input.value;
    showGreeting(inputName);
    saveNameInLS(inputName);
}

function saveNameInLS(userName) {
    localStorage.setItem(USER_LOCAL_STORAGE, userName);
}

function showGreeting(name) {
    greeting.innerHTML = `Hello, ${name}!`;
    greeting.classList.add('showing');
    form.classList.remove('showing');
}



