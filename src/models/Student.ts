import { model, Model, Schema } from 'mongoose';
import { IStudent } from '../interfaces/student.interface.js';
const studentSchema = new Schema<IStudent>(
  {
    name: {
      type: String,
      required: [true, 'Student name is required'],
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
      trim: true,
      match: [/^[A-Za-z]+(\s[A-Za-z]+)*$/, 'Name must contain only letters and spaces'],
    },
    marks: {
      type: Number,
      required: [true, 'Marks are required'],
      min: [0, 'Marks must be at least 0'],
      max: [100, 'Marks cannot exceed 100'],
      validate: {
        validator: Number.isFinite,
        message: 'Marks must be a valid number',
      },
    },
    class: {
      type: String,
      required: [true, 'Class is required'],
      trim: true,
      uppercase: true,
      match: [/^(?:[1-9]|10)[A-F]$/, 'Class must be between 1A and 10F'],
    },
  },
  {
    timestamps: true,
    versionKey: false, // Removes "__v"
  },
);

const Student: Model<IStudent> = model<IStudent>('Student', studentSchema);

export default Student;
