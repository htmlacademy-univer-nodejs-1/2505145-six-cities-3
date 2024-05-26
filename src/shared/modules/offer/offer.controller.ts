import {
  BaseController,
  HttpError,
  HttpMethod,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware
} from '../../libs/rest/index.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Request, Response } from 'express';
import { OfferService } from './offer-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { ParamOfferId } from './type/param-offerid.type.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { StatusCodes } from 'http-status-codes';
import { CommentRdo, CommentService } from '../comment/index.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) protected readonly offerService: OfferService,
    @inject(Component.CommentService) protected readonly commentService: CommentService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({
      path: '/',
      httpMethod: HttpMethod.Get,
      handler: this.index
    });
    this.addRoute({
      path: '/',
      httpMethod: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateOfferDto)]
    });

    this.addRoute({
      path: '/:offerId',
      httpMethod: HttpMethod.Get, handler: this.findById,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
    this.addRoute({
      path: '/:offerId',
      httpMethod: HttpMethod.Delete, handler: this.deleteById,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
    this.addRoute({
      path: '/:offerId',
      httpMethod: HttpMethod.Patch, handler: this.updateById,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto)
      ]
    });

    this.addRoute({
      path: '/premium',
      httpMethod: HttpMethod.Get,
      handler: this.findByPremiumAndCity
    });

    this.addRoute({
      path: '/favorites',
      httpMethod: HttpMethod.Get,
      handler: this.findByFavorite
    });
    this.addRoute({
      path: '/favorites/:offerId',
      httpMethod: HttpMethod.Post,
      handler: this.addFavoriteById,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
    this.addRoute({
      path: '/favorites/:offerId',
      httpMethod: HttpMethod.Delete,
      handler: this.removeFavoriteById,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });

    this.addRoute({
      path: '/:offerId/comments',
      httpMethod: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const offer = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async findById({params}: Request<ParamOfferId>, res: Response) {
    const offer = await this.offerService.findById(params.offerId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async deleteById({params}: Request<ParamOfferId>, res: Response) {
    const offer = await this.offerService.deleteById(params.offerId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async updateById({params, body}: Request<ParamOfferId, unknown, UpdateOfferDto>, res: Response) {
    const offer = await this.offerService.updateById(params.offerId, body);

    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async findByPremiumAndCity(req: Request, res: Response): Promise<void> {
    const city = req.query.city;
    if (!city) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Bad request',
        'OfferController'
      );
    }

    const offers = await this.offerService.findByPremiumAndCity(city as string);
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async findByFavorite(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findByFavorite();
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async addFavoriteById({params}: Request<ParamOfferId>, res: Response): Promise<void> {
    const {offerId} = params;
    const offer = await this.offerService.addFavoriteById(offerId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async removeFavoriteById({params}: Request<ParamOfferId>, res: Response): Promise<void> {
    const {offerId} = params;
    const result = await this.offerService.removeFavoriteById(offerId);
    this.ok(res, fillDTO(OfferRdo, result));
  }

  public async getComments({params}: Request<ParamOfferId>, res: Response): Promise<void> {
    if (!await this.offerService.exists(params.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController'
      );
    }

    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }
}
