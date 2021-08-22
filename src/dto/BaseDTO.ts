import { validateOrReject, ValidationError as ValidationErrorDTO } from 'class-validator';
import ValidationError from '../errors/ValidationError';

export default class BaseDTO {
  validate() {
    return validateOrReject(this).catch((errors: ValidationErrorDTO[]) => {
      throw new ValidationError(
        'Validation error',
        errors.map((err) => ({
          [err.property]: Object.entries(err.constraints).map(([, value]) => (value)),
        })).reduce((acc, curr) => ({ ...acc, ...curr }), {}),
      );
    });
  }
}
