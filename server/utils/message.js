let moment = require('moment');

let generateMessage = (from, text) => ({
    from, text, createdAt: moment().valueOf()
});

let generateLocationMessage = (from, latitude, longitude) => ({
    from, 
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: new moment().valueOf()
})

module.exports = { generateMessage, generateLocationMessage };