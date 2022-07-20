let socket = io.connect();
//variables
let target = document.getElementById('target'); //variable for div ,chatbox where people see the messages
let userlist = document.getElementById('userlist'); // variable online user list div

//ask username and check if there is an answer
let username;
do {
    username = window.prompt('please give your username');
} while (username === "")

//if username is submitted, send to server to put into usernames array
if (username !== "") {
    socket.emit('sendToList', (username));
}

//display which user has joined in chat
let message = '<span id="user" style="color: red">' + username + '</span>' + ' has joined the chat!';
socket.emit('sendToAll', (message));

// press enter to send message to all
document.getElementById('input').addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        document.getElementById('sendToAll').click();
    }
});

//to send to all people
function displayMessageToAll() {
    let message = '<span id="user" style="color: red">' + username + '</span>' + ': ' + document.getElementById('input').value;
    socket.emit('sendToAll', (message)); //send the message to the server
}


document.getElementById('sendToAll').addEventListener("click", displayMessageToAll);

//to send to myself only
function displayMessageToMe() {
    let message = document.getElementById('input').value;
    socket.emit('sendToMe', (message));//send the message to the server

}

document.getElementById('sendToMe').addEventListener("click", displayMessageToMe);



// displaying online users based on array in server
// (if the list is empty for the client, show all usernames in the array)
// (else only show the latest added -> for people already online)

socket.on('displayList', (usernames) => { // receive usernames array from server
    if (!userlist.innerHTML) { //if the list is empty on the client side do the for each
        console.log(usernames);
        usernames.forEach(username => {  //loop through list
            userlist.innerHTML += '<br>' + username;  // each username get displayed
        });
    } else {                              //if the client already has online users add the new online user(s) to the list
        userlist.innerHTML += '<br>' + usernames[usernames.length - 1];
    }
});
//displaying messages
socket.on('displayMessage', (message) => {//display the message back into the socket
    target.innerHTML += '<br>' + message;
});