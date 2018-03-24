const mongoose = require("mongoose");

const User = mongoose.model("User");

module.exports = app => {
  app.post("/api/user", async (req, res) => {
    const { googleId } = req.body;
    const user = new User({
      googleId
    });

    try {
      await user.save();
      res.status(200).send(user);
    } catch (err) {
      res.status(401).send(err);
    }
  });
};
