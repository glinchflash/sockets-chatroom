//require express and http
const express = require('express');
const http = require('http');
//define the application
const app = express();
//path to the client
const clientPath = `${__dirname}/../client`;
//use express to host our server
app.use(express.static(clientPath));
//let express give us the http for the server
const server = http.createServer(app);
//get the server live on port 8080 of our localhost
server.listen(8080, () =>{
    console.log("server running on "+ 8080);
});
//require socket.io and make our io variable the entry point of all clients/sockets connecting to our server
const io = require('socket.io')(server);
// variable for array of users
let usernames = [];
// variable for user in server to log out
let serverUser;
//counter for the amount of people connected
let counter = 0;
io.on('connection', (socket) => {
    counter++;
    console.log('people connected: '+counter); //console log in the server goes to the terminal
    socket.on('sendToAll', (message) =>{ //get message from socket to send to all
        io.emit("displayMessage", (message)); //send back the message to all people connected to the server
    });
    socket.on('sendToMe', (message) =>{ //get message from socket to send back to the same socket
        socket.emit("displayMessage", (message)); //only send back to the original socket
    });

    socket.on('sendToList', (username)=>{ //get username from socket to send back to the same socket
        serverUser = username;
        socket.username = serverUser
        usernames.push(username); // push username received from client into usernames array
        io.emit("displayList", (usernames)) //return the usernames array to the client
    });
    socket.on("disconnecting", () => { //get the socket that was disconnected
        counter--; // reduces counter by 1
        console.log("user has left: " + counter + " are connected"); //log in console (terminal)
        usernames = removeItemOnce(usernames , socket.username); //remove user from array
        io.emit("displayRemovedUsers", usernames); //push back to clients
    });
});
function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}