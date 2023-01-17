
const loginForm = document.getElementById('welcome-form');
const messageSection = document.getElementById('messages-section');
const messageList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';


function login(event) {
    event.preventDefault();
    if(userNameInput.value === '') { 
        alert(`This field can't be empty`)
    } else {
        userName = userNameInput.value;
        loginForm.classList.remove('show');
        messageSection.classList.add('show');
    } 
};

function sendMessage(event) {
    event.preventDefault();
    if(messageContentInput.value === '') { 
        alert(`Hey ${userName}! This field can't be empty`)
    } else {
        addMessage(userName, messageContentInput.value);
        messageContentInput.value = '';
    } 
};

function addMessage(author, content) {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if(author === userName) {
        message.classList.add('message--self');
    }
    const h3 = document.createElement('h3');
    h3.classList.add('message__author');
    const div = document.createElement('div');
    div.classList.add('message__content');
    h3.textContent = userName !== author ? userName : 'You';
    div.textContent = content;
    message.appendChild(h3);
    message.appendChild(div);
    messageList.appendChild(message);
}

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);
