import { NextFunction } from 'express';

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter the username'],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Please enter the email'],
    validate: [validator.isEmail, 'Please email valid email'],
  },
  photo: [String],
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please enter the Password'],
    minLength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please enter confirm password'],
    validate: {
      validator: function (this: any, val: string): boolean {
        return val === this.password;
      },
    },
  },
  passwordChangeAt: Date,
  passwordResetToken: String,
  passwordResetExpires: String,
});

userSchema.pre('save', async function (this: any, next: NextFunction) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.pre('save', function (this: any, next: NextFunction) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangeAt = Date.now() - 1000;
  next();
});

userSchema.methods.comparePassword = async (
  enteredPassword: string,
  savedPassword: string
) => await bcrypt.compare(enteredPassword, savedPassword);

const User = mongoose.model('User', userSchema);

export default User;
