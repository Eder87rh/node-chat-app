const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        res = isRealString(23);
        expect(res).toBeFalsy();
    });

    it('should reject string with non-space characters', () => {
        res = isRealString('    ');
        expect(res).toBeFalsy();
    });

    it('should allow string with non-space characters', () => {
        res = isRealString('ok');
        expect(res).toBeTruthy();
    })
});