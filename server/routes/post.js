const express = require("express");
const router = express.Router();
const { postsDB } = require("../nedb");

// Create
router.post("/", (req, res) => {
  postsDB.insert(req.body, (err, doc) => {
    if (err) return res.status(500).send(err);
    res.send(doc);
  });
});

// Read
router.get("/", (req, res) => {
  postsDB.find({}, (err, docs) => {
    res.send(docs);
  });
});

// Delete
router.delete("/:id", (req, res) => {
  postsDB.remove({ _id: req.params.id }, {}, () => {
    res.send({ success: true });
  });
});

module.exports = router;
