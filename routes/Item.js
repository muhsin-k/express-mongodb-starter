const mongoose = require("mongoose");

const Item = mongoose.model("Item");

module.exports = app => {
  app.get("/api/item/:id", async (req, res) => {
    const items = await Item.find({ _user: req.params.id }).cache({
      key: req.params.id
    });
    res.status(200).json(items);
  });
  app.post("/api/item", async (req, res) => {
    const { title, _user } = req.body;
    const item = new Item({
      title,
      _user
    });

    try {
      await item.save();
      res.status(200).json(item);
    } catch (err) {
      res.status(401).json("Invalid User Id");
    }
  });
};
