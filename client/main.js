let socket = io.connect();

//to send to all people
function displayMessageToAll() {
    let message = document.getElementById('input').value;
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