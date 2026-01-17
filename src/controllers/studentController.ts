import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Student from '../models/Student.js';
import { StudentQuery, StudentRequestBody } from '../interfaces/student.interface.js';

export const addStudent = async (
  req: Request<{}, {}, StudentRequestBody>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, marks, class: studentClass } = req.body;

    if (!name?.trim() || marks == null || !studentClass?.trim()) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    const student = await Student.create({
      name: name.trim(),
      marks,
      class: studentClass.trim(),
    });

    res.status(201).json(student);
  } catch (error) {
    next(error);
  }
};

export const getStudents = async (
  req: Request<{}, {}, {}, StudentQuery>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const query: Partial<StudentQuery> = {};

    if (req.query.class) {
      query.class = req.query.class.trim();
    }

    const students = await Student.find(query);
    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
};

export const getStudentMarks = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid student ID format' });
      return;
    }

    const student = await Student.findById(id).select('name marks');
    if (!student) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }

    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
};

export const updateStudent = async (
  req: Request<{ id: string }, {}, Partial<StudentRequestBody>>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid student ID' });
      return;
    }

    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ message: 'At least one field is required for update' });
      return;
    }

    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedStudent) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid student ID' });
      return;
    }

    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    next(error);
  }
};
