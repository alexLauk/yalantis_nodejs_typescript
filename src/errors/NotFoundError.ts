import HTTPError from './HttpError';

export default class NotFoundError extends HTTPError {
  constructor(error: string) {
    super(error, 400, 'NOTFOUND');
  }
}
