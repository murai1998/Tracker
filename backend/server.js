const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
let list = require("./models/list");
let List = require("./models/list.model");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(async x => {
    // let data1 = await List.insertMany(list);
    // console.log(data1);
    console.log("Connected!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database successfully connected!");
});

const exercisesRoute = require("./routes/exercises");
const usersRoute = require("./routes/users");

app.use("/", exercisesRoute);
app.use("/", usersRoute);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
