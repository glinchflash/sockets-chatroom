let socket = io.connect();
//ask username and check if there is an answer
let username;
do {
    username = window.prompt('please give your username');
} while (username === "")

//display which user has joined in chat
let message = '<span id="user" style="color: red">'+username+ '</span>'+' has joined the chat!';
socket.emit('sendToAll', (message));

//to send to all people
function displayMessageToAll() {
    let message ='<span id="user" style="color: red">'+username+ '</span>'+': '+ document.getElementById('input').value;
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
