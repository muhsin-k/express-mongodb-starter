const express = require("express");
const async = require("async");
const router = express.Router();
const mongoose = require("mongoose");
const Item = mongoose.model("Item");
router.get("/:id", async (req, res) => {
  
  try {
    const items = await Item.find({ _user: req.params.id });
    res.status(200).json(items);
  } catch (err) {
    res.status(404).json({'err':'Invalid User Id'});
  }
  
});
router.post("/", async (req, res) => {
  const { title, _user } = req.body;
  const item = new Item({
    title,
    _user
  });

  try {
    await item.save();
    res.status(200).json(item);
  } catch (err) {
    res.status(401).json(err);
  }
});
module.exports = router;