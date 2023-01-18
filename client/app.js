const socket = io();

//sockets
socket.on('message', ({ author, content }) => addMessage(author, content));
socket.on('newUser', ({ author, content }) => addMessage(author, content));
socket.on('exitUser', ({ author, content }) => addMessage(author, content));

//select 
const loginForm = document.getElementById('welcome-form');
const messageSection = document.getElementById('messages-section');
const messageList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

//functions
let userName = '';

function login(e) {
    e.preventDefault();
    if(userNameInput.value === '') { 
        alert(`This field can't be empty`)
    } else {
        userName = userNameInput.value;
        loginForm.classList.remove('show');
        messageSection.classList.add('show');
        socket.emit('join', userName);
    } 
};

function sendMessage(e) {
    e.preventDefault();
    if(messageContentInput.value === '')  alert(`Hey ${userName}! This field can't be empty`);
    addMessage(userName, messageContentInput.value);
    socket.emit('message',{
        author: userName,
        content: messageContentInput.value,
    });
    messageContentInput.value = '';
};

function addMessage(author, content) {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if(author === userName) {
        message.classList.add('message--self');
    } else if (author === 'Chat-Boot') {
        message.classList.add('boot')
    }
    message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author}</h3>
    <div class="message__content">
      ${content}
    </div>`;
    messageList.appendChild(message);
};

loginForm.addEventListener('submit', (e) => { login(e)});
addMessageForm.addEventListener('submit', (e) => { sendMessage(e)});

