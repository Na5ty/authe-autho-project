const User = require("../models/user");
const bcrypt = require("bcrypt");

async function createAdminAccount() {
  try {
    const existingAdmin = await User.findOne({ role: "admin" });
    if (!existingAdmin) {
      const newAdmin = new User({
        email: "admin@test.dci",
        name: "Admin",
        password: await bcrypt.hash("admin", 10),
        role: "admin",
      });
      await newAdmin.save();

      console.log("Admin account created");
    } else {
      console.log("Admin account already exists");
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = createAdminAccount;
