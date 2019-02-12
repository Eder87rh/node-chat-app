var socket = io();

socket.on('connect', function () {
    socket.emit('getRoomsList', null, function (rooms) {
        console.log(rooms);
        var select = document.getElementById('rooms');
        var createButton = document.getElementById('create-room');
        var roomField = document.getElementById('room');

        createButton.addEventListener('click', function () {
            var formSelectRoom = document.getElementById('form-select-room');
            var formCreateRoom = document.getElementById('form-create-room');
            formCreateRoom.setAttribute('style','display: relative');
            formSelectRoom.setAttribute('style','display: none');
        });

        if (rooms.length > 0) {
            rooms.forEach(room => {
                var option = document.createElement('option');
                option.appendChild(document.createTextNode(room));
                option.setAttribute('value', room);
    
                select.appendChild(option);
            });
            
            roomField.value = select.value

            select.addEventListener('change', function (value) {
			    console.log('TCL: value', select.value)
                roomField.value = select.value
            })

        } else {

        }

    })
});