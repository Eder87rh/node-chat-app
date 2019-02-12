class Rooms {
    constructor() {
        this.rooms = [];
    }

    addRoom (nameRoom) {

        let exist = this.rooms.find(room => room === nameRoom);

        if (!exist) {
            this.rooms.push(nameRoom);
        }

        return nameRoom;
    }

    removeRoom (nameRoom) {
        let room = this.getRoom(nameRoom);
        
        if (room) {
            this.rooms = this.rooms.filter(room => room !== nameRoom);
        }
        return room;
    }

    getRoom (nameRoom) {
        return this.rooms.find(room => room === nameRoom);
    }

    getRoomList () {
        return this.rooms; 
    }
}

module.exports = { Rooms }