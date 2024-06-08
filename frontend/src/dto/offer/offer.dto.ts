import { CITIES, Facilities, GOODS, TYPES } from '../../const.js';
import { UserDto } from '../user/user.dto.js';
import { Type } from '../../types/types.js';

export class OfferDto {
  public id!: string;

  public name!: string;

  public description!: string;

  public datePublished!: string;

  public city!: string;

  public previewImagePath!: string;

  public photosPaths!: string[];

  public isPremium!: boolean;

  public isFavorite!: boolean;

  public rating!: number;

  public housingType!: Type;

  public numberRooms!: number;

  public numberGuests!: number;

  public rentPrice!: number;

  public facilities!: Facilities[];

  public user!: UserDto;

  public numberComments!: number;

  public coordinates!: string;
}
