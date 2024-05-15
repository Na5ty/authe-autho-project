const User = require("../models/user");

async function getUsers() {
  const user = await User.find({});
  return user;
}

module.exports = { getUsers };
