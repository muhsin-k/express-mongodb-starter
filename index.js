const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const keys = require("./config/keys");

//Connect MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});
// Initialize Mongo Models
require("./models/User");
require("./models/Item");
// Initialize Redis
// require("./services/cache");
const app = express();

app.use(bodyParser.json());
// API Routes
app.use("/api", require("./routes/index"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port`, PORT);
});
