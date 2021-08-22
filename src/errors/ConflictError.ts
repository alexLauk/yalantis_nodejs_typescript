import HTTPError from './HttpError';

export default class ConflictError extends HTTPError {
  constructor(error: string) {
    super(error, 400, 'FAILED');
  }
}
