var socket = io();

function scrollToBottom () {
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');
    
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = document.getElementById('message-template');
    var html = Mustache.render(template.text, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();

   /*  var formattedTime = moment(message.createdAt).format('h:mm a');
    console.log('New message', message);
    var li = document.createElement("LI");
    li.innerText = `${message.from} ${formattedTime}: ${message.text}`;

    document.getElementById('messages').appendChild(li); */
});

socket.on('newLocationMessage', function (message) {

    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = document.getElementById('location-message-template');
    var html = Mustache.render(template.text, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();

    /* var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = document.createElement("LI");
    li.innerHTML = `${message.from} ${formattedTime}: `;

    var a = document.createElement("a");
    a.text = "My current value";
    a.setAttribute('href', message.url);
    a.setAttribute('target', "_blank")

    li.appendChild(a);
    document.getElementById('messages').appendChild(li); */
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