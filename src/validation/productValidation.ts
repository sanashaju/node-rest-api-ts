import Joi, { ObjectSchema } from 'joi';
import { CreateProductDTO, UpdateProductDTO } from '../interfaces/product.interface.js';

const noOnlySpaces = Joi.string()
  .pattern(/^(?!\s*$).+/)
  .messages({
    'string.pattern.base': 'Field cannot contain only spaces',
  });

export const createProductValidation: ObjectSchema<CreateProductDTO> = Joi.object({
  title: noOnlySpaces.min(2).max(100).required().messages({
    'string.empty': 'Product title is required',
    'string.min': 'Product title must be at least 2 characters',
    'string.max': 'Product title cannot exceed 100 characters',
  }),

  author: noOnlySpaces.min(2).max(100).required().messages({
    'string.empty': 'Author name is required',
    'string.min': 'Author name must be at least 2 characters',
    'string.max': 'Author name cannot exceed 100 characters',
  }),

  price: Joi.number().min(0).required().messages({
    'number.base': 'Price must be a valid number',
    'number.min': 'Price cannot be negative',
    'any.required': 'Price is required',
  }),

  category: noOnlySpaces.optional(),

  publisher: noOnlySpaces.optional(),

  isbn: noOnlySpaces.optional(),

  stock: Joi.number().min(0).required().messages({
    'number.base': 'Stock must be a valid number',
    'number.min': 'Stock cannot be negative',
    'any.required': 'Stock is required',
  }),
});

export const updateProductValidation: ObjectSchema<UpdateProductDTO> = Joi.object({
  title: noOnlySpaces.min(2).max(100),

  author: noOnlySpaces.min(2).max(100),

  price: Joi.number().strict().min(0).messages({
    'number.base': 'Price must be a valid number (not a string)',
    'number.min': 'Price cannot be negative',
  }),

  category: noOnlySpaces.optional(),

  publisher: noOnlySpaces.optional(),

  isbn: noOnlySpaces.optional(),

  stock: Joi.number().strict().min(0).messages({
    'number.base': 'Stock must be a valid number (not a string)',
    'number.min': 'Stock cannot be negative',
  }),
})
  .min(1)
  .messages({
    'object.min': 'At least one field must be provided to update',
  });
