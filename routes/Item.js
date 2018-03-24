const mongoose = require("mongoose");

const Item = mongoose.model("Item");

module.exports = app => {
  app.post("/api/item", async (req, res) => {
    const { title, _user } = req.body;
    const item = new Item({
      title,
      _user
    });

    try {
      await item.save();
      res.status(200).send(item);
    } catch (err) {
      res.status(400).send(err);
    }
  });
};
