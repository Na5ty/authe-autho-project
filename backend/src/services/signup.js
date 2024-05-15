const User = require("../models/user");
const bcrypt = require("bcrypt");

async function createUser(userData) {
  const { name, email, password } = userData;
  const hashedPassword = await bcrypt.hashSync(password, 10);
  const existingUser = await User.findOne({ email: email });
  if (!existingUser) {
    const createdUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });
    const savedUser = await createdUser.save();
    return savedUser;
  } else {
    console.log("User already exists");
  }
}

module.exports = { createUser };
