import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Request, Response } from 'express';
import { OfferService } from './offer-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { CreateOfferRequest } from './create-offer-request.type.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) protected readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({path: '/', httpMethod: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', httpMethod: HttpMethod.Post, handler: this.create});
  }

  public async index(req: Request, res: Response) {
    const offers = await this.offerService.find();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create(
    req: CreateOfferRequest,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create(req.body);
    this.created(res, fillDTO(OfferRdo, result));
  }
}
