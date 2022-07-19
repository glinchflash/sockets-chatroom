let socket = io.connect();

//to send to all people
function displayMessageToAll() {
    let message = document.getElementById('input').value;
    socket.emit('sendToAll', (message));
    console.log(message);
    socket.on('displayMessage', (message) => {
        target.innerHTML += '<br>'+message;
    })
}

document.getElementById('sendToAll').addEventListener("click",displayMessageToAll);

//to send to myself only
function displayMessageToMe() {
    let message = document.getElementById('input').value;
    socket.emit('sendToMe', (message));
    console.log(message);
    socket.on('displayMessage', (message) => {
        target.innerHTML += '<br>'+message;
    })
}

document.getElementById('sendToMe').addEventListener("click",displayMessageToMe);

