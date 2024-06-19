const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: [true, "Email already exists"],
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [8, "Minimum password length is 6 characters"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (confirmedPass) {
        return confirmedPass === this.password;
      },
      message: "Passwords are not the same",
    },
  },
  role: {
    type: String,
    enum: ["user", "guide", "lead-guide", "admin", "editor"],
    message: "Role must be one of: user, admin, editor",
    default: "user",
  },

  beauty: [
    {
      beautyId: { 
        type: mongoose.Schema.ObjectId, 
        ref: "Beauty",
      },
      date: {
        type: String,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("User", userSchema);
