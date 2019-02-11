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
    var messageTextBox = document.getElementById('message');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.value
    }, function () {
        messageTextBox.value = '';
    });
});

var locationButton = document.getElementById('send-location');
locationButton.addEventListener('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.setAttribute('disabled', true);
    locationButton.innerText = 'Sending location...';

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttribute('disabled');
        locationButton.innerText = 'Send location';
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        })
    }, function () {
        locationButton.removeAttribute('disabled');
        locationButton.innerText = 'Send location';
        alert('Unable to fetch location.');
    });
});