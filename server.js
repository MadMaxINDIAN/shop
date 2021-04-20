// IMPORT
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { MONGODB, DEVELOPMENT_DATABASE } = require("./config");

// ROUTERS
const users = require("./router/users");

// INITIALISING APP AND SETUP
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/u/",users);

// MONGODB SETUP
mongoose.connect(
  MONGODB + DEVELOPMENT_DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MONGODB");
  }
);
mongoose.set("useFindAndModify", false);

// app.get('/',(req, res) => {
//   res.send('Hello')
// })

// LISTEN ON THE PORT
const PORT = process.env.PORT;
app.listen(PORT, (req, res) => {
  console.log(`Server is up and running on PORT on ${PORT}`);
});
