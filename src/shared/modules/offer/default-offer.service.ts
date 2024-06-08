import { DocumentType, types } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferService } from './offer-service.interface.js';
import { OfferEntity } from './offer.entity.js';
import { inject, injectable } from 'inversify';
import { Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { DEFAULT_OFFER_COUNT, DEFAULT_PREMIUM_CITY_OFFER_COUNT } from './offer.constant.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {
  }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.name}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['userId'])
      .exec();
  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;
    return this.offerModel
      .find()
      .limit(limit)
      .populate(['userId'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        '$inc': {
          numberComments: 1,
        }
      }).exec();
  }

  public async findByPremiumAndCity(city: string): Promise<DocumentType<OfferEntity, types.BeAnObject>[] | null> {
    return this.offerModel
      .find({isPremium: true, city})
      .sort({createdAt: SortType.Down})
      .limit(DEFAULT_PREMIUM_CITY_OFFER_COUNT)
      .populate(['userId'])
      .exec();
  }

  public async findByFavorite(): Promise<DocumentType<OfferEntity, types.BeAnObject>[] | null> {
    return this.offerModel
      .find({isFavorite: true})
      .populate(['userId'])
      .exec();
  }

  public async addFavoriteById(offerId: string): Promise<DocumentType<OfferEntity, types.BeAnObject> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {isFavorite: true}, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async removeFavoriteById(offerId: string): Promise<DocumentType<OfferEntity, types.BeAnObject> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {isFavorite: false}, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async calculateTotalRating(offerId: string, newRating: number): Promise<DocumentType<OfferEntity, types.BeAnObject> | null> {
    const offer = await this.offerModel.findById(offerId).exec();

    if (!offer) {
      return null;
    }

    const totalRating = Math.round(((offer.rating * offer.numberComments) + newRating) / (offer.numberComments + 1) * 10) / 10;
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        rating: totalRating
      })
      .populate(['userId'])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({_id: documentId})) !== null;
  }
}
