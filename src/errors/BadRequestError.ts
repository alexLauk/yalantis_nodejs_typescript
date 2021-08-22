import HTTPError from './HttpError';

export default class BadRequestError extends HTTPError {
  constructor(error: string) {
    super(error, 400, 'FAILED');
  }
}
