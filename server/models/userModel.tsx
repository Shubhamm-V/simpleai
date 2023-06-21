const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the username"],
  },
  email: {
    type: String,
    required: [true, "Please enter the email"],
  },
  photo: [String],
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please enter the Password"],
    minLength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please enter confirm password"],
    validate: {
      validator: function (val: String) {
        return val === this.password;
      },
    },
  },
  passwordChangeAt: Date,
  passwordResetToken: String,
  passwordResetExpires: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
