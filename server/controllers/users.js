import mongoose from 'mongoose';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: 'Please enter all fields' });

    if (name && name.length <= 4)
      return res
        .status(400)
        .json({ message: 'Username must be atleast 4 characters long' });

    if (email && !validateEmail(email)) {
      return res
        .status(400)
        .json({ message: 'Please enter a valid email address' });
    }

    if (password && password.length < 8)
      return res
        .status(400)
        .json({ message: 'Password must be atleast 8 characters long' });

    try {
      const user = await User.findOne({ email });
      if (user) throw Error('User already exists');

      const salt = await bcrypt.genSalt(10);
      if (!salt) throw Error('Something went wrong with bcrypt');

      const hash = await bcrypt.hash(password, salt);
      if (!hash) throw Error('Something went wrong hashing the password');

      const newUser = new User({
        name,
        email,
        password: hash,
      });

      const savedUser = await newUser.save();
      if (!savedUser) throw Error('Something went wrong saving the user');

      const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {
        expiresIn: 3600,
      });

      res.status(200).json({
        token,
        user: {
          _id: savedUser.id,
          name: savedUser.name,
          email: savedUser.email,
        },
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
