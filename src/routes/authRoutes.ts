import express from 'express';
import { loginUser, registerUser } from '../controllers/authController.js';
import { registerValidation } from '../validation/auth.validation.js';
import { validate } from '../middleware/validation.middleware.js';
// import { validate } from '../middleware/validation.middleware.js';

const authRoutes = express.Router({ mergeParams: true });

authRoutes.post('/register',validate(registerValidation),registerUser);


authRoutes.post('/login', loginUser);

export default authRoutes;
