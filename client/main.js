let socket = io.connect();

function displayMessageToAll() {
    socket.emit('sendToAll', ('message'));

}

document.getElementById('sendToAll').addEventListener("click",displayMessageToAll);
socket.on('displayMessage', (message) => {
    document.getElementsByClassName('target').innerHTML += '<br>'+message;
});