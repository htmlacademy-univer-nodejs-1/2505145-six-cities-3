import { BaseController, HttpError, HttpMethod } from '../../libs/rest/index.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Response } from 'express';
import { fillDTO } from '../../helpers/index.js';
import { UserService } from './user-service.interface.js';
import { CreateUserRequest } from './create-user-request.type.js';
import { StatusCodes } from 'http-status-codes';
import { Config, RestSchema } from '../../libs/config/index.js';
import { UserRdo } from './rdo/user.rdo.js';
import { LoginUserRequest } from './login-user-request.type.js';


@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) protected readonly userService: UserService,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) {
    super(logger);

    this.logger.info('Register routes for UserController…');

    this.addRoute({path: '/register', httpMethod: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/login', httpMethod: HttpMethod.Post, handler: this.login});
  }

  public async create(
    {body}: CreateUserRequest,
    res: Response
  ): Promise<void> {
    const existUser = await this.userService.findByEmail(body.email);

    if (existUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email ${body.email} exists.`,
        'UserController'
      );
    }

    const newUser = await this.userService.create(body, this.config.get('SALT'));
    this.created(res, fillDTO(UserRdo, newUser));
  }

  public async login(
    {body}: LoginUserRequest,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (!existsUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} not found.`,
        'UserController',
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  }
}
