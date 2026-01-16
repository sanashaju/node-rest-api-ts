import express, { Router } from 'express';
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from '../controllers/productController.js';
import { verifyAdmin, verifyUser } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validation.middleware.js';
import {
  createProductValidation,
  updateProductValidation,
} from '../validation/productValidation.js';

const productRoutes: Router = express.Router({ mergeParams: true });

productRoutes.post('/', verifyAdmin, validate(createProductValidation), addProduct);

productRoutes.get('/', verifyUser, getProducts);

productRoutes.patch('/:id', verifyAdmin, validate(updateProductValidation), updateProduct);

productRoutes.delete('/:id', verifyAdmin, deleteProduct);

export default productRoutes;
