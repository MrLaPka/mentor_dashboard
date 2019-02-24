let assert = require('assert');
const json = require('./data.json');
if (typeof require !== 'undefined') XSLX = require('xlsx');
const tasksFromFile = XSLX.readFile('src/xslx/Tasks.xlsx');
const operation = require('./xslx.js');
describe('getTests', function () {
    describe('Json', function () {
        it('should return Objecr with tests when the json with tests is correct', function () {
            const test = operation.getTasks(tasksFromFile.Sheets['Sheet1']);
            assert.deepEqual(test, json);
        });
    });
});