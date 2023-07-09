const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    select: false,
  }
})

//encrypt password before save - HOOKS
userSchema.pre("save", async function (next) {
  // if not modifed than dont do anything
  if (!this.isModified("password")) {
    return next()
  }
  // if modfied than do this
  this.password = await bcrypt.hash(this.password, 10)
})


// validate the password with passed on user password
userSchema.methods.isValidatedPassword = async function (usersendPassword) {
  return await bcrypt.compare(usersendPassword, this.password)
}

//create and return jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  })
}


module.exports = mongoose.model("User", userSchema)
