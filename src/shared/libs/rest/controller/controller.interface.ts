import { Request, Router } from 'express';
import { Route } from '../types/route.interface.js';

export interface Controller {
  readonly router: Router;
  addRoute(route: Route): void;
  send<T>(req: Request, statusCode: number, data: T): void;
  ok<T>(req: Request, data: T): void;
  created<T>(req: Request, data: T): void;
  noContent<T>(req: Request, data: T): void;
}
