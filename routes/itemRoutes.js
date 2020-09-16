const express = require("express");
const router = new express.Router();


const Item = require('../item');

/** GET / => [item, ...] */
router.get('', (req, res, next) => {
  try {
    return res.json({ items: Item.findAll() });
  } catch(err){
    return next(err)
  }
});

/** POST / {name, price} => new-item */
router.post('', (req, res, next) => {
  try {
    let newItem = new Item(req.body.name, req.body.price);
    return res.status(201).json({item: newItem});
  } catch (err) {
    return next(err)
  }
});

/** GET /[name] => item */
router.get('/:name', (req, res, next) => {
  try {
    let foundItem = Item.find(req.params.name);
    return res.json({item:foundItem});
  } catch(err){
    return next(err)
  }
});

/** PATCH /[name] => item */
router.patch('/:name', (req, res, next) => {
  try {
    let foundItem = Item.update(req.params.name, req.body);
    return res.json({ item: foundItem });
  } catch (err) {
    return next(err)
  }
});

/** DELETE /[name] => "Removed" */
router.delete('/:name', (req, res, next) => {
  try {
    Item.remove(req.params.name);
    return res.json({message:'Deleted'});
  } catch (err) {
    return next(err)
  }
});

module.exports = router;
































// GET /items - this should render a list of shopping items.
// Here is what a response looks like:
// [{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]
router.get("/", function(req, res) {
  return res.json(items);


});	

// POST /items - this route should accept JSON data and add it to the shopping list.
// Here is what a sample request/response looks like:
// {“name”:”popsicle”, “price”: 1.45} => {“added”: {“name”: “popsicle”, “price”: 1.45}}
router.post("/", (req, res) => {




} )

// GET /items/:name - this route should display a single item’s name and price.
// Here is what a sample response looks like:
// {“name”: “popsicle”, “price”: 1.45}

// PATCH /items/:name, this route should modify a single item’s name and/or price.
// Here is what a sample request/response looks like:
// {“name”:”new popsicle”, “price”: 2.45} => {“updated”: {“name”: “new popsicle”, “price”: 2.45}}

// DELETE /items/:name - this route should allow you to delete a specific item from the array.
// Here is what a sample response looks like:
// {message: “Deleted”}
/** DELETE /users/[id]: delete user, return status */
// router.delete("/:id", function(req, res) {
//  const idx = users.findIndex(u => u.id === +req.params.id);
//   users.splice(idx, 1);
//   return res.json({ message: "Deleted" });
// });		



module.exports = router;
