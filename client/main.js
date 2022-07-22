let socket = io.connect();
//variables
let target = document.getElementById('target'); //variable for div ,chatbox where people see the messages
let userlist = document.getElementById('userlist'); // variable online user list div
let keys = { //to get key checks for on enter press for press all and shift+enter for send to me
    e: false,
    e2: false,
};

//ask username and check if there is an answer
let username;
//switch statement for changing usernames according
do {
    username = window.prompt('please give your username');
    switch (true) {
        case username.includes('tim'):
            username = "Why Can't I RickRoll";
            break;
        case username.includes('TIM'):
            username = "Why Can't I RickRoll";
            break;
        case username.includes('Tim'):
            username = "Why Can't I RickRoll";
            break;
        case username.includes('sicco'):
            username = 'ItsNotCoAcHesBuTCoucHes';
            break;
        case username.includes('Sicco'):
            username = 'ItsNotCoAcHesBuTCoucHes';
            break;
        case username.includes('SICCO'):
            username = 'ItsNotCoAcHesBuTCoucHes';
            break;
        case username.includes('SiCCo'):
            username = 'ItsNotCoAcHesBuTCoucHes';
            break;
        case username.includes('sIccO'):
            username = 'ItsNotCoAcHesBuTCoucHes';
            break;
        default:
    }

} while (username === "")

//if username is submitted, send to server to put into usernames array
if (username !== "") {
    socket.emit('sendToList', (username));
}


//display which user has joined in chat
let message = '<span id="user" style="color: red">' + username + '</span>' + ' has joined the chat!';
socket.emit('sendToAll', (message));



let input = document.getElementById('input');

// press enter to send message to all
document.getElementById('input').addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        keys.e = true;
        e.preventDefault();
    }
    if (keys.e && !keys.e2){
        document.getElementById('sendToAll').click();
    }
});

//press shift+enter to send to yourself
document.getElementById('input').addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        keys.e = true;
        e.preventDefault();
    }
    if (e.key === "Shift"){
        keys.e2 = true;
        e.preventDefault();
    }

    if (keys.e  && keys.e2 ){
        document.getElementById('sendToMe').click();
        //get shift enter combination to enter new line in inputfield
    }
});

//reset keys
addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        keys.e = false;
    }
    if (e.key === "Shift") {
        keys.e2 = false;
    }
});

//to send to all people
function displayMessageToAll() {
    switch (true){
        case input.value.includes("location.href"):
            input.value = "No tim don't even try ";
            break;
        default:
            input.value = document.getElementById('input').value;
    }


    let message = '<span id="user" style="color: red">' + username + '</span>: '  + input.value;
    socket.emit('sendToAll', (message)); //send the message to the server
}


document.getElementById('sendToAll').addEventListener("click", displayMessageToAll);

//to send to myself only
function displayMessageToMe() {
    if (input.value === '<img src="https://i.kym-cdn.com/photos/images/facebook/001/490/362/5af.png"' +
        ' onload="window.location.href = \'https://www.youtube.com/watch?v=dQw4w9WgXcQ\';" width="100" height="132">'){
        input.value = "No tim don't even try ";
    } else{
        input = document.getElementById('input');
    }
    let message = input.value;
    socket.emit('sendToMe', (message));//send the message to the server

}

document.getElementById('sendToMe').addEventListener("click", displayMessageToMe);


// displaying online users based on array in server
// (if the list is empty for the client, show all usernames in the array)
// (else only show the latest added -> for people already online)

socket.on('displayList', (usernames) => { // receive usernames array from server
    if (!userlist.innerHTML) { //if the list is empty on the client side do the for each
        usernames.forEach(username => {  //loop through list
            userlist.innerHTML += username + '<br>' ;  // each username get displayed
        });
    } else {                              //if the client already has online users add the new online user(s) to the list
        userlist.innerHTML += '<br>' + usernames[usernames.length - 1] ;
    }
});


//displaying messages
socket.on('displayMessage', (message) => {//display the message back into the socket
    target.innerHTML += message + '<br>' ;
    target.scrollTop = target.scrollHeight;
});



//display disconnected users
socket.on("displayRemovedUsers", (usernames) =>{ //display the userslist back into the online user list after being altered
    userlist.innerHTML = "";
    usernames.forEach(username =>{
        userlist.innerHTML += username+ '<br>';
    })
})
