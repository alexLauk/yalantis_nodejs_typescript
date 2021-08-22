import HTTPError from './HttpError';

export default class UnauthorizedError extends HTTPError {
  constructor(error: string) {
    super(error, 401, 'UNAUTHORIZED');
  }
}
