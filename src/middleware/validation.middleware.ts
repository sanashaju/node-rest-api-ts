import { Request, Response, NextFunction } from 'express';
import { ObjectSchema, ValidationError, ValidationResult } from 'joi';

export const validate =
  (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const validationResult: ValidationResult = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });

    const { error }: { error?: ValidationError } = validationResult;

    if (error) {
      const errors: string[] = error.details.map((detail) => detail.message.replace(/["]/g, ''));

      res.status(400).json({
        error: errors.length === 1 ? errors[0] : errors,
      });
      return;
    }

    next();
  };
