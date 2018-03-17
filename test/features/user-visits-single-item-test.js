const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

// Add your tests below:

describe('User creates new item', ()=> {
  describe('and visits single-item', ()=> {
    it('ItemObject', () => {
      const itemToCreate = buildItemObject();
      browser.url('/items/create');

      browser.setValue('#title-input', itemToCreate.title);
      browser.setValue('#description-input', itemToCreate.description);
      browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
      browser.click('#submit-button');

      browser.click('.item-card a');
      console.log("++++++++++++++++++++++++++++++++");
      console.log(browser.getText('body'));
      console.log("++++++++++++++++++++++++++++++++");

      assert.include(browser.getText('body'), itemToCreate.description);
    });
  });
});
