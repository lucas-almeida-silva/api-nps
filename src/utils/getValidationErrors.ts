import { ValidationError } from "yup";

export function getValidationErrors(error: ValidationError) {
  const validationErrors = { };

  error.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}