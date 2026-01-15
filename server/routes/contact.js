const express = require('express');
const router = express.Router();
const { contactsDB } = require("../nedb");

// CREATE
router.post('/', async (req, res) => {
  try {
    const doc = await contactsDB.insert(req.body);
    res.send(doc);
  } catch (err) {
    res.status(500).send(err);
  }
});

// READ
router.get('/', async (req, res) => {
  try {
    const docs = await contactsDB.find({});
    res.send(docs);
  } catch (err) {
    res.status(500).send(err);
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const numRemoved = await contactsDB.remove({ _id: req.params.id });
    res.send({ success: true, removed: numRemoved });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
