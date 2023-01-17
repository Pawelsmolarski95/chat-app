const socket = io();
const loginForm = document.getElementById('welcome-form');
const messageSection = document.getElementById('messages-section');
const messageList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';

socket.on('message', ({author, content}) => addMessage(author, content));

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
    if(messageContentInput.value === '')  alert(`Hey ${userName}! This field can't be empty`);
    addMessage(userName, messageContentInput.value);
    socket.emit('message',({author: userName , content: messageContentInput.value}))
    messageContentInput.value = '';
};

function addMessage(author, content) {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if(author === userName) {
        message.classList.add('message--self');
    }
    message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author}</h3>
    <div class="message__content">
      ${content}
    </div>`;
    messageList.appendChild(message);
}

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);
socket.on('message', addMessage)
