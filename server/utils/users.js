class Users {
    constructor () {
        this.users = [];
    }

    addUser (id, name, room) {
        var user = { id, name, room };
        this.users.push(user);
        return user;
    }

    removeUser (id) {
        let users = this.users.filter((user) => user.id !== id);
        this.users = users;
    }

    getUser (id) {
        let user = this.users.find((user) => user.id === id);
        return user;
    }

    getUserList (room) {
        let users = this.users.filter((user) => user.room === room);
        let namesArray = users.map((user) => user.name);
        return namesArray;
    }
}

module.exports = { Users };

/* class Person {
    constructor (name ,age) {
        this.name = name;
        this.age = age;
    }
    getUserDescription () {
        return `${this.name} is ${this.age} year(s) old.`
    }
}

var me = new Person('Andrew', 25);
var description = me.getUserDescription();
console.log(description); */