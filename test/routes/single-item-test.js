const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your test blocks below:
  describe('GET', () =>{
    it('gets single-item and renders', async () =>{
      const createdItem = await seedItemToDatabase();
      const response = await request(app)
        .get('/items/'+createdItem._id);

      // assert.equal(response.status, 200);
      // assert.equal(response.headers.location, '/items/:createdItem._id');
      assert.include(parseTextFromHTML(response.text, '#item-title'), createdItem.title);
      assert.include(parseTextFromHTML(response.text, '#item-description'), createdItem.description);
    });
  });
});
