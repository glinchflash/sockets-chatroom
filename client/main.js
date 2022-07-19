let socket = io.connect();

//to send to all people
function displayMessageToAll() {
    let message = document.getElementById('input').value;
    socket.emit('sendToAll', (message)); //send the message to the server
    console.log(message);
    socket.on('displayMessage', (message) => { //display the message back into the socket
        target.innerHTML += '<br>'+message;
    })
}

document.getElementById('sendToAll').addEventListener("click",displayMessageToAll);

//to send to myself only
function displayMessageToMe() {
    let message = document.getElementById('input').value;
    socket.emit('sendToMe', (message));//send the message to the server
    console.log(message);
    socket.on('displayMessage', (message) => {//display the message back into the socket
        target.innerHTML += '<br>'+message;
    })
}

document.getElementById('sendToMe').addEventListener("click",displayMessageToMe);

