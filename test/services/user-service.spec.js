
const assert = require('assert');

const testUserService = require('../../src/services/user-service');

describe('getUser', () => {
   it('return a user when given id 1', () => {
       const expected = {
           id: 1,
           name: 'John Smith',
           email: 'js@local-lambdas.com',
       }

       const result = testUserService.getUser(1);
       assert.deepEqual(result, expected);
   });

   it('return a not found error when passing an id other than 1', () => {
       const expected = {
           error: `Cannot find user against Id 2`
       }

       const result = testUserService.getUser(2);
       assert.deepEqual(result, expected);
   });
});
