import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import {
  RegisterRequestBody,
  LoginRequestBody,
  UserResponse,
  IUserDocument,
} from '../interfaces/user.interface.js';

export const registerUser = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response,
): Promise<void> => {
  console.log('>>>> Register user function called');

  try {
    const { username, email, password, role, age } = req.body;

    // Simple validation
    if (!username || !email || !password) {
      res.status(400).json({ message: 'Please fill all required fields' });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Create user
    const user: IUserDocument = await User.create({
      username,
      email,
      password,
      role: role || 'user',
      age: age || null,
    });

    const responseData: UserResponse = {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
      age: user.age,
    };

    res.status(201).json(responseData);
  } catch (error) {
    console.error('Error in registerUser:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password required' });
      return;
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.username,
        admin: user.role === 'admin',
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' },
    );

    const responseData: UserResponse = {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
      age: user.age,
      token,
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error in loginUser:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
