# NODE.JS CHATROOM

## Learning Objectives
After this learning challenge, you'll be able to:
- Set up a node environment
- Make a connection between different clients and the servers
- Work with sockets
- Configure express and socket.io for node
- Make a basic chatroom

## The Mission
Now that you guys know how to configure a node server, let's make a chatroom to hang out with your friends and families!

### Steps

1. [x] In the root of the project make a server and a client folder.
    - -[x] In the server folder, make a server.js file
    - -[x] In the client file make a html, css and js file. Link them in the html.
2. -[x] In the server folder, do the <code>npm init</code> command.
    - -[x] The default values for the following prompts are fine, but play around if you like.
    - -[x] This will generate a package.json with some information about our project and it's dependencies.
3. -[x] Next we are going to install express
    - -[x] <code>npm install express --save</code>
    - -[x] Go take a look at the package.json, it's there!
4. -[x] In the server.js file, let's require express and http
    - -[x] <code>const express = require('express');</code>
    - -[x] <code>const http = require('http');</code>
5. -[x]  We will use express and http to make it easy to host our client
    - -[x] <code>const app = express();</code> To define our application
    - -[x] <code>const clientPath = \`${__dirname}/../client\`;</code> To give the path to our client
    - -[x] <code>app.use(express.static(clientPath));</code> To use express to host the client
    - -[x] <code>const server = http.createServer(app);</code> To use http to serve the app that express provides
    - -[x] One more step to get the server live
    - ```
      server.listen(8080, () =>{
         console.log("server running on "+port);
      });
      ```
    - -[x] <code>node server</code> and check your server out on localhost with the correct port!
6. -[x] Time to get socket.io installed
    - -[x] <code>npm install socket.io --save</code>
    - -[x] It's now inside of the package.json dependencies!
7. -[x] Time to set it up in the server
    - -[x] <code>const io = require('socket.io')(server);</code> to require socket.io!
    - -[x] The io variable is now the entry point of all the sockets connected to the server
8. -[x] The server now is ready to use socket.io, but for the client we still need to add the connection to socket.io
    - -[x] Add ```<script src="/socket.io/socket.io.js"></script>``` above your other script in the client html.
    - -[x] Add <code>let socket = io.connect();</code> to your script to define your socket.
9. -[x] Now we can start by making a connection from your client to your server
    - -[x] In your server.js, add the following code
    - ```
      io.on('connection', (socket) => {
          console.log('someone connected');
      });
      ```
    - -[x] If you open up your blank page at localhost 8080 nothing much will happen, but go take a look at the terminal which is running your server! In here you will see that someone connected!
10. -[x] At this moment you can connect with multiple devices to your server, try adding a little code to verify this.
    - -[x] In your server make a counter: <code>let counter = 0</code>
    - -[x] Change your console log in the connection to: <code>console.log(counter+' someone connected');</code>
    - vMake the counter go up by 1 every time someone connects.
    - -[x] Now try connecting in 2 different browser tabs, in your terminal you will now see
    - ```
      0 someone connected
      1 someone connected
      ```
    - -[x] As you can see you can now connect with multiple devices to the same server.
11. -[x] Now let's make something happen, add an input field, 2 buttons and a target div.
    - -[x] The input will contain your message
    - -[x] 1 button that sends this message to all connected clients
    - -[x] 1 button that sends this message to you only
    - -[x] A target div where all messages will be displayed
12. -[x] On click of a button, do an emit to the server. The server will receive this and react appropriately after we give the server the instructions of what to do on said action.
    - -[x] For example, to send the message to everyone: <code>socket.emit('sendToAll', ('message'));</code>
    - -[x] Your server will now receive the call 'sendToAll', now we need to write code to make it react appropriately
13. -[x] In the connection function in your server, add the following:
    - ```
        socket.on('sendToAll', (message) =>{
            io.emit("displayMessage", (message));
        });
      ```
    - -[x] This is an observer that waits until the message "sendToAll" gets passed to the server.
    - -[x] When we press the button on the client, because of our emit on the client, the server will receive the 'sendToAll' call and execute the piece of code within on the server.
    - -[x] The io.emit on the server means that the server will now send the call to 'displayMessage' to ALL clients connected and also passes the message back as a parameter.
14. -[x] We have now sent the message from the client to the server, now we just need to receive it back from the server.
    - -[x] In the client add:
    - ```
        socket.on('displayMessage', (message) => {
            target.innerHTML += '<br>'+message;
        });
      ```
    - -[x] So now your client is waiting for the call to 'displayMessage' and then it will add that message to your target div.
    - -[x] Try connecting with a few browser tabs and sending messages to each other.
15. -[x] So now we can send a message to everyone, let's see if we can send some messages that only the sender can see.
    - -[x] In your client, replicate the 'sendToAll' emit but now change it to be 'sendToMe'.
    - -[x] Now in the server you also have to make an observer for the message "sendToMe", so go ahead and replicate the "sendToAll" observer in the server.
    - -[x] Now instead of doing an io.emit, we are going to do a socket.emit. The difference here is that if you emit to io, all connected clients will receive the message, whereas the socket.emit will only send it back to the socket of which it received the message.
    - -[x] Try it out by opening some tabs and send a message to yourself. If only that client can see it, and the others don't receive it you've completed this step
16. -[x] Now we have all the tools we need to make a basic chatroom. The requirements you need to add will come with a small tip on how to achieve them.

### Must-have features

- -[ ] Make a UI that makes it easy for people to send messages in this chatroom.
- -[ ]  must be possible to send a message to everyone or to yourself
- -[ ] Make sure we can identify who sent the message through a username.
    - -[ ] We could make a local variable and prompt the user to choose a username
    - -[ ] We can then emit this username along with the sent message to keep track of who sent what.
- -[ ] Make a list to show everyone who is connected to the chatroom
- -[ ] Implement something funny! The sky is the limit! (it can be very simple if you want)
    - -[ ] For example, you could make a functionality to make someone else's font size obscurely small!
    - -[ ] You could implement a feature where you can speak with someone else's username
    - -[ ] AND SO MUCH MORE -> BE CREATIVE

### Nice-to-have features

- -[ ] Instead of just asking for a username, we can make a user class with properties such as
    - -[ ] username
    - -[ ] password (if you make a login system)
    - -[ ] avatar
    - -[ ] font-color
    - -[ ] ... whatever you want :D
    - -[ ] ps: don't worry about security
- -[ ] You can make different rooms to join by code
- -[ ] Make it possible to send private messages to a person
- -[ ] Add images, emojis, videos, gifs to your messages
- -[ ] Bring back some features from MSN! (lol)
- -[ ] Make a login / registration (a bit more difficult)
    - -[ ] again, security is not a must
- -[ ] PIMP IT

### What did I learn
- How to setup a server and connect multiple clients to it
- How to install express and socket.io


### Issues I came across
- Basic struggles with the npm having some errors but got them fixed relatively easily
- When sending messages (both to all or to myself) they increment after every message send
  - still not fixed.