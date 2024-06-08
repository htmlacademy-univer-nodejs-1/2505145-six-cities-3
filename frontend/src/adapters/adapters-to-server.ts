import { Comment, type CommentAuth, NewOffer, Offer, UserRegister } from '../types/types.js';
import { CreateUserDto } from '../dto/user/create-user.dto.js';
import { Facilities, UserType } from '../const';
import { CreateOfferDto } from '../dto/offer/create-offer.dto.js';
import { UpdateOfferDto } from '../dto/offer/update-offer.dto.js';
import { getTime } from '../utils';
import { AuthCommentDto } from '../dto/comment/auth-comment.dto.js';

export const adaptUserRegisterToServer =
  (user: UserRegister): CreateUserDto =>
  ({
    name: user.name,
    email: user.email,
    avatarImagePath: ' ',
    userType: user.isPro ? UserType.Pro : UserType.Default,
    password: user.password
  });

export const adaptAvatarToServer =
  (file: File) => {
    const formData = new FormData();
    formData.set('avatarImagePath', file);

    return formData;
  };

export const adaptCreateOfferToServer =
  (newOffer: NewOffer): CreateOfferDto => ({
    name: newOffer.title,
    description: newOffer.description,
    datePublished: getTime(),
    city: newOffer.city.name,
    previewImagePath: newOffer.previewImage,
    photosPaths: [],
    isPremium: newOffer.isPremium,
    isFavorite: false,
    housingType: newOffer.type,
    numberRooms: newOffer.bedrooms,
    numberGuests: newOffer.maxAdults,
    rentPrice: newOffer.price,
    facilities: newOffer.goods as Facilities[],
    coordinates: `latitude: ${newOffer.location.latitude}, longitude: ${newOffer.location.longitude}`
  });

export const adaptEditOfferToServer =
  (offer: Offer): UpdateOfferDto => ({
    name: offer.title,
    description: offer.description,
    datePublished: getTime(),
    city: offer.city.name,
    previewImagePath: offer.previewImage,
    photosPaths: offer.images,
    isPremium: offer.isPremium,
    isFavorite: false,
    housingType: offer.type,
    numberRooms: offer.bedrooms,
    numberGuests: offer.maxAdults,
    rentPrice: offer.price,
    facilities: offer.goods as Facilities[],
    coordinates: `latitude: ${offer.location.latitude}, longitude: ${offer.location.longitude}`
  });

export const adaptCreateCommentToServer =
  (comment: CommentAuth): AuthCommentDto => ({
    offerId: comment.id,
    text: comment.comment,
    rating: comment.rating
  });
