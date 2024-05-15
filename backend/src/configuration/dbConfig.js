const dotenv = require("dotenv");

const mongoose = require("mongoose");

dotenv.config();

const MONGODB_PASS = process.env.MONGODB_PASS;
const USER_NAME = process.env.USER_NAME;

const uri = `mongodb+srv://${USER_NAME}:${MONGODB_PASS}@cluster0.5yacuif.mongodb.net/test1`;

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = mongoose;
