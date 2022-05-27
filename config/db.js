const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI");

const connect = async () => {
  try {
    await mongoose.connect(db);
    console.log("Connected to Database...");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connect;
