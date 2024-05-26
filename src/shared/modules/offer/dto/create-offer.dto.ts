import { City, Facilities, HousingType } from '../../../types/index.js';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsMongoId,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class CreateOfferDto {
  @MinLength(10, {message: CreateOfferValidationMessage.name.minLength})
  @MaxLength(100, {message: CreateOfferValidationMessage.name.maxLength})
  public name: string;

  @MinLength(20, {message: CreateOfferValidationMessage.description.minLength})
  @MaxLength(1024, {message: CreateOfferValidationMessage.description.maxLength})
  public description: string;

  @IsDateString({}, {message: CreateOfferValidationMessage.datePublished.invalidFormat})
  public datePublished: Date;

  @IsEnum(City, {message: CreateOfferValidationMessage.city.invalidFormat})
  public city: City;

  @MaxLength(256, {message: CreateOfferValidationMessage.previewImagePath.maxLength})
  public previewImagePath: string;

  @IsArray({message: CreateOfferValidationMessage.photosPaths.invalidFormat})
  public photosPaths: string[];

  @IsBoolean({message: CreateOfferValidationMessage.isPremium.invalid})
  public isPremium: boolean;

  @IsBoolean({message: CreateOfferValidationMessage.isFavorite.invalidFormat})
  public isFavorite: boolean;

  // @IsNumber({},{ message: CreateOfferValidationMessage.rating.invalidFormat })
  // @Min(1, { message: CreateOfferValidationMessage.rating.min })
  // @Max(5, { message: CreateOfferValidationMessage.rating.max })
  public rating: number;

  @IsEnum(HousingType, {message: CreateOfferValidationMessage.housingType.invalidFormat})
  public housingType: HousingType;

  @IsInt({message: CreateOfferValidationMessage.numberRooms.invalidFormat})
  @Min(1, {message: CreateOfferValidationMessage.numberRooms.min})
  @Max(8, {message: CreateOfferValidationMessage.numberRooms.max})
  public numberRooms: number;

  @IsInt({message: CreateOfferValidationMessage.numberGuests.invalidFormat})
  @Min(1, {message: CreateOfferValidationMessage.numberGuests.min})
  @Max(10, {message: CreateOfferValidationMessage.numberGuests.max})
  public numberGuests: number;

  @IsInt({message: CreateOfferValidationMessage.rentPrice.invalidFormat})
  @Min(100, {message: CreateOfferValidationMessage.rentPrice.min})
  @Max(100000, {message: CreateOfferValidationMessage.rentPrice.max})
  public rentPrice: number;

  @IsArray({message: CreateOfferValidationMessage.facilities.invalidFormat})
  @IsEnum(Facilities, {message: CreateOfferValidationMessage.facilities.invalidElementFormat})
  public facilities: Facilities[];

  @IsMongoId({message: CreateOfferValidationMessage.userId.invalidId})
  public userId: string;

  public numberComments: number;

  public coordinates: string;
}
