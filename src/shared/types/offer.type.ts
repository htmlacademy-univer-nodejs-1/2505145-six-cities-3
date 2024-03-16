import { City } from './city.enum.js';
import { HousingType } from './housing-type.enum.js';
import { Facilities } from './facilities.enum.js';
import { User } from './user.type.js';

export type Offer = {
  name: string,
  description: string,
  datePublished: Date,
  city: City,
  previewImagePath: string,
  photosPaths: string[],
  isPremium: boolean,
  isFavorite: boolean,
  rating: number,
  housingType: HousingType,
  numberRooms: number,
  numberGuests: number,
  rentPrice: number,
  facilities: Facilities[],
  author: User,
  numberComments: number,
  coordinates: string
}
