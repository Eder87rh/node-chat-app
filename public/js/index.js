var socket = io();

socket.on('connect', function () {
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('New message', message);
    var li = document.createElement("LI");
    li.innerText = `${message.from}: ${message.text}`;

    document.getElementById('messages').appendChild(li);
});

var form = document.getElementById('message-form').addEventListener("submit", function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: document.getElementById("message").value
    }, function () {

    });
});