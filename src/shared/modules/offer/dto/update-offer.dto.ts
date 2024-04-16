import { City, Facilities, HousingType } from '../../../types/index.js';

export class UpdateOfferDto {
  public name?: string;
  public description?: string;
  public datePublished?: Date;
  public city?: City;
  public previewImagePath?: string;
  public photosPaths?: string[];
  public isPremium?: boolean;
  public isFavorite?: boolean;
  public rating?: number;
  public housingType?: HousingType;
  public numberRooms?: number;
  public numberGuests?: number;
  public rentPrice?: number;
  public facilities?: Facilities[];
  public coordinates?: string;
}
