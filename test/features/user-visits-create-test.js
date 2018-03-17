const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

// Add your tests below:

describe('User visits the create page', ()=> {
  describe('and posts a new item', ()=> {
    it('ItemObject', () => {
      const itemToCreate = buildItemObject({title:'My fav', description: 'descr', imageUrl: 'http://placebear.com/g/200/300'});
      browser.url('/items/create');

      browser.setValue('#title-input', itemToCreate.title);
      browser.setValue('#description-input', itemToCreate.description);
      browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
      browser.click('#submit-button');

      assert.include(browser.getText('body'), itemToCreate.title);
      assert.include(browser.getAttribute('body img', 'src'), itemToCreate.imageUrl);
    });
  });
});
