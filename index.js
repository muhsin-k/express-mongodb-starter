const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const keys = require("./config/keys");

//Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});
require("./models/User");
require("./models/Item");
require("./services/cache");
const app = express();

app.use(bodyParser.json());

require("./routes/User")(app);
require("./routes/Item")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port`, PORT);
});
