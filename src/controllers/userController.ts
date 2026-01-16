import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { IUserDocument } from '../interfaces/user.interface.js';
import User from '../models/User.js';

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const query: Record<string, unknown> = {};

    if (req.query.age) {
      const age = Number(req.query.age);
      if (!isNaN(age)) {
        query.age = age;
      }
    }

    if (req.query.role && typeof req.query.role === 'string') {
      query.role = { $regex: new RegExp(`^${req.query.role.trim()}$`, 'i') };
    }

    const users: IUserDocument[] = await User.find(query).select('-password');

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserByIdPublic = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.params.id.trim();

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: 'Invalid user ID format' });
      return;
    }

    // Find user excluding password
    const user = await User.findById(userId).select('-password');

    if (!user) {
      res.status(404).json({ message: `User with ID ${userId} not found` });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
