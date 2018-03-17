const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

const findImageElementBySource = (htmlAsString, src) => {
  const image = jsdom(htmlAsString).querySelector(`img[src="${src}"]`);
  if (image !== null) {
    return image;
  } else {
    throw new Error(`Image with src "${src}" not found in HTML string`);
  }
};

describe('Server path: /items/create', () => {
  const itemToCreate = buildItemObject();

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your describe blocks below:
  describe('POST', () =>{
    it('creates a new item', async () =>{
      const itemToCreate = buildItemObject();
      const response = await request(app)
      .post('/items/create')
      .type('form')
      .send(itemToCreate);

      const createdItem = await Item.findOne(itemToCreate);
      assert.isOk(createdItem, 'Item was not created successfully in the database');
    });
    it('creates and redirects to /', async () =>{
      const itemToCreate = buildItemObject();
      const response = await request(app)
      .post('/items/create')
      .type('form')
      .send(itemToCreate);

      assert.equal(response.status, 302);
      assert.equal(response.headers.location, '/');
    });
    it('displays an error message when supplied an empty title', async() => {
      const invalidItemToCreate = {
        description: 'test',
        imageUrl: 'https://www.placebar.com/200/300',
      };

      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(invalidItemToCreate);

      assert.deepEqual(await Item.find({}), []);
      const allItems = await Item.find({});
      assert.equal(allItems.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });

  });
});
