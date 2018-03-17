const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, buildItemObject, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

const findImageElementBySource = (htmlAsString, src) => {
  const image = jsdom(htmlAsString).querySelector(`img[src="${src}"]`);
  if (image !== null) {
    return image;
  } else {
    throw new Error(`Image with src "${src}" not found in HTML string`);
  }
};

describe('Server path: /items/update', () => {

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your describe blocks below:
  describe('GET', () =>{
    it('gets item to update and renders', async () =>{
      const itemToUpdate = await seedItemToDatabase();
      const response = await request(app)
        .get('/items/'+itemToUpdate._id);

      // assert.equal(response.status, 200);
      // assert.equal(response.headers.location, '/items/:createdItem._id');
      assert.include(parseTextFromHTML(response.text, '#item-title'), itemToUpdate.title);
      assert.include(parseTextFromHTML(response.text, '#item-description'), itemToUpdate.description);
    });
  });

  describe('POST', () =>{
    it('updates item', async () =>{
      const itemToEdit = await seedItemToDatabase();

      itemToEdit.title = 'new title';

      console.log("############################");
      console.log(itemToEdit);
      console.log("############################");

      const edit = buildItemObject({title:itemToEdit.title, description: itemToEdit.description, imageUrl: itemToEdit.imageUrl});
      const response = await request(app)
        .post('/items/'+itemToEdit._id+'/update/')
        .type('form')
        .send(edit);

      assert.equal(response.headers.location, '/items/'+itemToEdit._id);
      const editedItem  = await Item.findById(itemToEdit._id);
      assert.equal(itemToEdit.title, edit.title);
    });
  });
});
