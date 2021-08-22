import HTTPError from './httpError';

export default class ValidationError extends HTTPError {
  constructor(error: string, errors: any) {
    super(error, 400, 'VALIDATION', errors);
  }
}
