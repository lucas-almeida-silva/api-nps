import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import createConnection from './database';
import { router } from './routes';
import { AppError } from './errors/AppError';
import { ValidationError } from 'yup';
import { getValidationErrors } from './utils/getValidationErrors';

createConnection();

const app = express();

app.use(express.json());
app.use(router);

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    });
  }
  else if (err instanceof ValidationError) {
    const errors = getValidationErrors(err);

    return response.status(400).json({
      message: 'Validation is failed',
      errors
    });
  }

  return response.status(500).json({
    status: 'Error',
    message: `Internal server errro ${err.message}`,
  });
});

export { app }