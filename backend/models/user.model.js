import mongoose, { Schema, model } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    smtpConfig: {
      host: { type: String },
      username: { type: String },
      port: { type: Number },
      password: { type: String },
      secure: { type: Boolean },
    },
    imapConfig: {
      host: { type: String },
      username: { type: String },
      port: { type: Number },
      password: { type: String },
      secure: { type: Boolean },
      tls: { type: Boolean }, // Add TLS field
    },
    isAdmin : {
      type:Boolean,
      default:false 
    }
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.tokenGeneration = function () {
  return jwt.sign(
    {
      userId: this._id,
      email: this.email,
    },
    process.env.JWT_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  );
};

export const User = model('User', userSchema);