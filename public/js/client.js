
username = prompt('Who are you?');
if (!username)
    username = 'Anonymous';
//connecting the client

//var socket = io('ws://' + location.host + '/ws/');
//var socket = io();
//var socket = io.connect('https://marcantoinericard.com', {secure: true});
var socket = io.connect('ws://' + location.host);
socket.emit('newUser',username);

var chat = document.getElementById('msg');
var form = document.getElementById('form');
var input = document.getElementById('input');
var timeout = undefined;
var idNotif = 0;

//Send message
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(input.value){
        socket.emit('message', {'username':username, 'message':filterXSS(input.value)});
        addMessage(username + ': ' + filterXSS(input.value));
        input.value='';
    }
});

input.addEventListener('input',() =>{

    if(input.value.length){
        socket.emit('isTyping',{'username':username, 'typing':true});
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
            socket.emit('isTyping',{'username':username, 'typing':false});
        },1000);
    }

});

socket.on('isTyping', (dataTyping) => {
    if(dataTyping.typing == true)
        addEvent(dataTyping.username + ' is typing...',dataTyping.username);
    else
        removeEvent(dataTyping.username);
});

//Receive message
socket.on('message', (msg) => {
    console.log(msg);
    addMessage(msg);
});

//Add message to front-end
function addMessage(msg){
    var item = document.createElement('p');
    item.textContent = msg;
    chat.appendChild(item);
}

function addEvent(event,username){
    if(!document.getElementById(username)){
        var notif = document.createElement('p');
        notif.id = username;
        notif.innerHTML = event;
        document.getElementById('notif').appendChild(notif);
    }
}

function removeEvent(username){
    var notif = document.getElementById(username);
    if(notif)
        document.getElementById(username).remove();
}
