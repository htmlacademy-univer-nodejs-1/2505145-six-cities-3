import { Error } from 'mongoose';

export class HttpError extends Error {
  public httpStatusCode!: number;
  public detail?: string;

  constructor(httpStatusCode: number, massage: string, detail?: string) {
    super(massage);

    this.httpStatusCode = httpStatusCode;
    this.message = massage;
    this.detail = detail;
  }
}
