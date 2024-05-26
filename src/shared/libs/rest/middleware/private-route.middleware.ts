import { Request, Response, NextFunction } from 'express';
import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

export class PrivateRouteMiddleware implements Middleware {
  execute({tokenPayload}: Request, _res: Response, _next: NextFunction): void {
    if (!tokenPayload) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'Unauthorized', 'PrivateRouteMiddleware');
    }
  }
}
