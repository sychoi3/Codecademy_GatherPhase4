
const Item = require('../../models/item');


const {assert} = require('chai');
const {buildItemObject, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

// Add your tests below:

describe('User visits item page', ()=> {

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  describe('and updates title', ()=> {
    it('ItemObject', () => {
      const itemToEdit = buildItemObject();
      browser.url('/items/create');

      browser.setValue('#title-input', itemToEdit.title);
      browser.setValue('#description-input', itemToEdit.description);
      browser.setValue('#imageUrl-input', itemToEdit.imageUrl);
      browser.click('#submit-button');

      browser.click('.item-card a');
      browser.click('#updateBtn');  // click update

      itemToEdit.title = "new title";
      browser.setValue('#title-input', itemToEdit.title); // change title
      browser.click('#submit-button');

      assert.include(browser.getText('body'), itemToEdit.title);
    });
  });
});
