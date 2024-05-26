import { BaseAuthException } from './base-auth.exception.js';
import { StatusCodes } from 'http-status-codes';

export class UserPasswordIncorrectException extends BaseAuthException {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, 'Incorrect user name or password');
  }
}
