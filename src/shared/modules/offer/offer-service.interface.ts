import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { DocumentExists } from '../../types/index.js';

export interface OfferService extends DocumentExists{
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  find(): Promise<DocumentType<OfferEntity>[]>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findByPremiumAndCity(city: string): Promise<DocumentType<OfferEntity>[] | null>;
  findByFavorite(): Promise<DocumentType<OfferEntity>[] | null>;
  addFavoriteById(id: string): Promise<DocumentType<OfferEntity> | null>;
  removeFavoriteById(id: string): Promise<DocumentType<OfferEntity> | null>;
  calculateTotalRating(id: string, newRating: number, newCommentsCount: number): Promise<DocumentType<OfferEntity> | null>;
  exists(documentId: string): Promise<boolean>;
}
