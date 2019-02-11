let expect = require('expect');
let { generateMessage, generateLocationMessage }  = require('./message');
describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const res = generateMessage('Eder', 'Hi!');
        expect(res.from).toBe('Eder');
        expect(res.text).toBe('Hi!');
        expect(typeof res.createdAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        const res = generateLocationMessage('Eder', 1, 1);
        expect(res.from).toBe('Eder');
        expect(res.url).toBe('https://www.google.com/maps?q=1,1');
        expect(typeof res.createdAt).toBe('number');
    });
});