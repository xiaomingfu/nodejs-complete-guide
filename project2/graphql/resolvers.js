const bcrypt = require("bcryptjs");
const User = require("../models/user");

module.exports = {
  createUser: async function({ userInput }, req) {
    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) {
      const error = new Error("User exists already!");
      throw error;
    }
    const hashPwd = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      email: userInput.email,
      password: hasPwd,
      name: userInput.name
    });
    const createUser = await user.save();
    return { ...createUser._doc, _id: createUser._id.toString() };
  }
};
