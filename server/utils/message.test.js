let expect = require('expect');
let { generateMessage }  = require('./message');
describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const res = generateMessage('Eder', 'Hi!');
        expect(res.from).toBe('Eder');
        expect(res.text).toBe('Hi!');
        expect(typeof res.createdAt).toBe('number');
    })
})