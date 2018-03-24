const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
  title: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  _user: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("Item", itemSchema);
