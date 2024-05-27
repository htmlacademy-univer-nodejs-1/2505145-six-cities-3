import { BaseAuthException } from './base-auth.exception.js';
import { StatusCodes } from 'http-status-codes';

export class UserNotFoundException extends BaseAuthException {
  constructor() {
    super(StatusCodes.NOT_FOUND, 'User not found');
  }
}
