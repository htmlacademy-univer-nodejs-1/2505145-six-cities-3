import { Request, Response, NextFunction } from 'express';
import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';
export class ValidateObjectIdMiddleware implements Middleware {
  constructor(private param: string) {
  }

  public async execute({params}: Request, _res: Response, next: NextFunction): Promise<void> {
    const objectId = params[this.param];

    if (Types.ObjectId.isValid(objectId)) {
      return next();
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `${objectId} is invalid ObjectID`,
      'ValidateObjectIdMiddleware'
    );
  }
}
