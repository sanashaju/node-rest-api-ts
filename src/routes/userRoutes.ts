import express, { Router } from 'express';
import { getUserByIdPublic, getUsers } from '../controllers/userController.js';

const userRoutes: Router = express.Router({ mergeParams: true });

userRoutes.get('/', getUsers);

userRoutes.get('/:id', getUserByIdPublic);

export default userRoutes;
