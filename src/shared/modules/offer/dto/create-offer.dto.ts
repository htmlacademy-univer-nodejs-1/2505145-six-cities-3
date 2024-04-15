import { City, Facilities, HousingType } from '../../../types/index.js';

export class CreateOfferDto {
  name: string;
  description: string;
  datePublished: Date;
  city: City;
  previewImagePath: string;
  photosPaths: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housingType: HousingType;
  numberRooms: number;
  numberGuests: number;
  rentPrice: number;
  facilities: Facilities[];
  userId: string;
  numberComments: number;
  coordinates: string;
}
