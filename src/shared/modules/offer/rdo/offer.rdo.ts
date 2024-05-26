import { Expose, Type } from 'class-transformer';
import { City, Facilities, HousingType } from '../../../types/index.js';
import { UserRdo } from '../../user/index.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public description: string;

  @Expose()
  public datePublished: Date;

  @Expose()
  public city: City;

  @Expose()
  public previewImagePath: string;

  @Expose()
  public photosPaths: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public housingType: HousingType;

  @Expose()
  public numberRooms: number;

  @Expose()
  public numberGuests: number;

  @Expose()
  public rentPrice: number;

  @Expose()
  public facilities: Facilities[];

  @Expose({name: 'userId'})
  @Type(() => UserRdo)
  public user: UserRdo;

  @Expose()
  public numberComments: number;

  @Expose()
  public coordinates: string;
}
