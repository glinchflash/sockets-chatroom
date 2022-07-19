let socket = io.connect();
//ask username
let username = window.prompt('username');
let message = username+' has joined the chat!';
socket.emit('sendToAll', (message));
//to send to all people
function displayMessageToAll() {
    let message =username+': '+ document.getElementById('input').value;
    socket.emit('sendToAll', (message)); //send the message to the server
}

document.getElementById('sendToAll').addEventListener("click",displayMessageToAll);

//to send to myself only
function displayMessageToMe() {
    let message = document.getElementById('input').value;
    socket.emit('sendToMe', (message));//send the message to the server

}

document.getElementById('sendToMe').addEventListener("click",displayMessageToMe);

//displaying
socket.on('displayMessage', (message) => {//display the message back into the socket
    target.innerHTML += '<br>'+message;
})


//display which user has joined in chat

// socket.on('displayMessage', (joinedMsg) => {//display the message back into the socket
//     target.innerHTML += '<br>'+joinedMsg;
// })