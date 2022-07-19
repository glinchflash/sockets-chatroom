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
//counter for the amount of people connected
let counter = 1;
io.on('connection', (socket) => {
    console.log(counter+' someone connected'); //console log in the server goes to the terminal
    counter++;
    socket.on('sendToAll', (message) =>{ //get message from socket to send to all
        io.emit("displayMessage", (message)); //send back the message to all people connected to the server
    });
    socket.on('sendToMe', (message) =>{ //get message from socket to send back to the same socket
        socket.emit("displayMessage", (message)); //only send back to the original socket
    });

});
