const router = require('express').Router();

const Item = require('../models/item');

router.get('/', async (req, res, next) => {
  const items = await Item.find({});
  res.render('index', {items});
});

// Add additional routes below:
router.get('/items/create', async(req,res) =>{
  res.render('create');
})

router.post('/items/create', async(req,res)=> {
  const {title, description, imageUrl} = req.body;
  const newItem = new Item({title, description, imageUrl});
  newItem.validateSync();
  if(newItem.errors){
    res.status(400).render('create', {newItem: newItem});
  } else{
      await newItem.save();
      res.redirect('/');
  }
});

router.get('/items/:id', async(req,res)=> {
  const id = req.params.id;
  const item = await Item.findById(id);
  res.render('single', {item: item});
});

router.get('/items/:id/update/', async(req, res)=>{
  const id = req.params.id;
  const item = await Item.findById(id);
  res.render('update', {item: item});
});

router.post('/items/:id/update/', async(req,res)=> {
  const id = req.params.id;
  const {title,description, imageUrl} = req.body;
  // console.log('##############################');
  // console.log({title}.title);
  const itemToEdit = await Item.findById(id);
  itemToEdit.title = {title}.title;
  itemToEdit.description = {description}.description;
  itemToEdit.imageUrl = {imageUrl}.imageUrl;
  itemToEdit.validateSync();
  if(itemToEdit.errors){
    res.status(400).render('update', {item: item});
  } else{
      await itemToEdit.save();
      res.redirect('/items/'+id);
  }
});

module.exports = router;
