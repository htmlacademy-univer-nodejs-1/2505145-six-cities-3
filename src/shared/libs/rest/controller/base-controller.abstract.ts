import { Router, Response } from 'express';
import { Route } from '../types/route.interface.js';
import { Controller } from './controller.interface.js';
import { Logger } from '../../logger/index.js';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import asyncHandler from 'express-async-handler';
import { PathTransformer } from '../transform/path-transformer.js';
import { Component } from '../../../types/index.js';

const DEFAULT_CONTENT_TYPE = 'application/json';

@injectable()
export abstract class BaseController implements Controller {
  private readonly _router: Router;

  @inject(Component.PathTransformer)
  private pathTransformer: PathTransformer;

  constructor(
    protected logger: Logger
  ) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public addRoute(route: Route): void {
    const wrapperAsyncHandler = asyncHandler(route.handler.bind(this));
    const middlewaresHandlers = route.middlewares?.map(
      (middleware) => asyncHandler(middleware.execute.bind(middleware))
    );

    const allHandlers = middlewaresHandlers
      ? [...middlewaresHandlers, wrapperAsyncHandler]
      : wrapperAsyncHandler;

    this._router[route.httpMethod](route.path, allHandlers);
    this.logger.info(`Route registered: ${route.httpMethod.toUpperCase()} ${route.path}`);
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    const modifiedData = this.pathTransformer.execute(data as Record<string, unknown>);
    res
      .type(DEFAULT_CONTENT_TYPE)
      .status(statusCode)
      .json(modifiedData);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent(res: Response): void {
    this.send(res, StatusCodes.NO_CONTENT, null);
  }
}
