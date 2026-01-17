import express, { Router } from 'express';
import {
  addStudent,
  deleteStudent,
  getStudentMarks,
  getStudents,
  updateStudent,
} from '../controllers/studentController.js';
import {
  createStudentValidation,
  studentUpdateValidation,
} from '../validation/studentValidation.js';
import { validate } from '../middleware/validation.middleware.js';

const studentRoutes: Router = express.Router({ mergeParams: true });

studentRoutes.post('/', validate(createStudentValidation), addStudent);

studentRoutes.get('/', getStudents);

studentRoutes.get('/:id/marks', getStudentMarks);

studentRoutes.patch('/:id', validate(studentUpdateValidation), updateStudent);

studentRoutes.delete('/:id', deleteStudent);

export default studentRoutes;
