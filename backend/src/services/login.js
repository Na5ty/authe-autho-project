const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generateToken } = require("../utils/jwtUtils");

async function login(email, password) {
  try {
    const existingUser = await User.findOne({ email }); //return user if it exists
    /*
    const existingUser ={
        _id:
        663b3db1e3424244aecd881c
        name:
        "Admin"
        email:
        "admin@test.dci"
        password:
        "$2b$10$BRy7nxfNIAS56Wca1/SvZu.MRdigKb8pD6uxLuVrMMsqGHNjOFl0q"
        role:
        "admin"
        __v:
        0
    }
    */
    if (!existingUser) {
      throw new Error("User not found!");
    }
    const isPasswordValid = bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password!");
    }
    const token = generateToken(existingUser);
    return token;
  } catch (error) {
    console.log(error.message);
    throw new Error("Invalid login credentials!");
  }
}

module.exports = { login };
