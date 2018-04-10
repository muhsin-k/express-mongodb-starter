const express = require("express");
const async = require("async");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
router.post("/", async (req, res) => {
  const { userName,emailId } = req.body;
  const user = new User({
    userName,
    emailId
  }); 

  try {
    await user.save();
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      res.status(401).send({error:'Email Id already registered'});
    } else {
      res.status(401).send(err);
    }
  }
});
module.exports = router;