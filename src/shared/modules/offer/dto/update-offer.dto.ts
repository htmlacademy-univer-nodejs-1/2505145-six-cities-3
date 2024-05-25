import { City, Facilities, HousingType } from '../../../types/index.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum, IsInt,
  IsNumber,
  IsOptional, Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, { message: CreateOfferValidationMessage.name.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.name.maxLength })
  public name?: string;

  @IsOptional()
  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: CreateOfferValidationMessage.datePublished.invalidFormat })
  public datePublished?: Date;

  @IsOptional()
  @IsEnum(City, { message: CreateOfferValidationMessage.city.invalidFormat })
  public city?: City;

  @IsOptional()
  @MaxLength(256, { message: CreateOfferValidationMessage.previewImagePath.maxLength })
  public previewImagePath?: string;

  @IsOptional()
  @IsArray({ message: CreateOfferValidationMessage.photosPaths.invalidFormat })
  public photosPaths?: string[];

  @IsOptional()
  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalid })
  public isPremium?: boolean;

  @IsOptional()
  @IsBoolean({message: CreateOfferValidationMessage.isFavorite.invalidFormat})
  public isFavorite?: boolean;

  @IsOptional()
  @IsNumber({},{ message: CreateOfferValidationMessage.rating.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.rating.min })
  @Max(5, { message: CreateOfferValidationMessage.rating.max })
  public rating?: number;

  @IsOptional()
  @IsEnum(HousingType, {message: CreateOfferValidationMessage.housingType.invalidFormat})
  public housingType?: HousingType;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.numberRooms.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.numberRooms.min })
  @Max(8, { message: CreateOfferValidationMessage.numberRooms.max })
  public numberRooms?: number;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.numberGuests.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.numberGuests.min })
  @Max(10, { message: CreateOfferValidationMessage.numberGuests.max })
  public numberGuests?: number;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.rentPrice.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.rentPrice.min })
  @Max(100000, { message: CreateOfferValidationMessage.rentPrice.max })
  public rentPrice?: number;

  @IsOptional()
  @IsArray({ message: CreateOfferValidationMessage.facilities.invalidFormat })
  @IsEnum(Facilities, {message: CreateOfferValidationMessage.facilities.invalidElementFormat})
  public facilities?: Facilities[];

  @IsOptional()
  public coordinates?: string;
}
