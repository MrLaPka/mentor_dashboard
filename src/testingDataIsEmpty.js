let assert = require('assert');
const json = require('./component/data.json');
    describe('jsonIsEmpty', function () {
        it('should return true if data.json is not empty', function () {
            assert.equal(true, json.length!==0);
        });
    });