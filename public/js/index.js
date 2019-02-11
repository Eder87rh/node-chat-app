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

socket.on('newLocationMessage', function (message) {
    var li = document.createElement("LI");
    li.innerHTML = `${message.from}: `;

    var a = document.createElement("a");
    a.text = "My current value";
    a.setAttribute('href', message.url);
    a.setAttribute('target', "_blank")

    li.appendChild(a);
    document.getElementById('messages').appendChild(li);
});

document.getElementById('message-form').addEventListener("submit", function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: document.getElementById("message").value
    }, function () {

    });
});

var locationButton = document.getElementById('send-location');
locationButton.addEventListener('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        })
    }, function () {
        alert('Unable to fetch location.');
    });
});