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
    var params = $.deparam(window.location.search);
    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('updateUserList', function (users) {
    console.log(users)
    var ol = document.createElement('ol');



    users.forEach(function (user) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(user));
        ol.appendChild(li);
    });

    var container = document.getElementById('users');

    while (container.hasChildNodes()) {   
        container.removeChild(container.firstChild);
    }
    
    container.appendChild(ol)

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
});

document.getElementById('message-form').addEventListener("submit", function(e) {
    e.preventDefault();
    var messageTextBox = document.getElementById('message');

    socket.emit('createMessage', {
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