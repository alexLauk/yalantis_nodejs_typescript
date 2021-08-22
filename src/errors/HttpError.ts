export default class HTTPError extends Error {
  public statusCode: number;

  public typeError: string;

  public errors?: any;

  public constructor(message: string, statusCode: number, typeError: string, errors?: any) {
    super(message);
    this.statusCode = statusCode;
    this.typeError = typeError;
    this.errors = errors;
  }

  get JSON() {
    return {
      typeError: this.typeError,
      message: this.message,
      errors: this.errors,
      stack: this.stack,
    };
  }
}
