import { OfferDto } from '../dto/offer/offer.dto.js';
import { UserDto } from '../dto/user/user.dto.js';
import { Comment, Offer, User } from '../types/types.js';
import { CityLocation, UserType } from '../const';
import { AuthCommentDto } from '../dto/comment/auth-comment.dto.js';
import { CommentDto } from '../dto/comment/comment.dto.js';

export const adaptUserToClient =
  (user: UserDto): User => ({
    name: user.name,
    avatarUrl: user.avatarImagePath,
    isPro: user.userType === UserType.Pro,
    email: user.email
  });

export const adaptOffersToClient =
  (offers: OfferDto[]): Offer[] =>
    offers
      .filter((offer: OfferDto) =>
        offer.user !== null,
      )
      .map((offer: OfferDto) => adaptOfferToClient(offer));

export const adaptOfferToClient =
  (offer: OfferDto): Offer =>
    ({
      id: offer.id,
      price: offer.rentPrice,
      rating: offer.rating,
      title: offer.name,
      isPremium: offer.isPremium,
      isFavorite: offer.isFavorite,
      city: {
        name: offer.city,
        location: CityLocation[offer.city]
      },
      location: CityLocation[offer.city],
      previewImage: offer.previewImagePath,
      type: offer.housingType,
      bedrooms: offer.numberRooms,
      description: offer.description,
      goods: offer.facilities,
      host: adaptUserToClient(offer.user),
      images: offer.photosPaths,
      maxAdults: offer.numberGuests
    });

export const adaptCommentsToClient =
  (commentsDto: CommentDto[]): Comment[] =>
    commentsDto
      .filter((commentsDto: CommentDto) =>
        commentsDto.user !== null,
      )
      .map((commentsDto: CommentDto) => adaptCommentToClient(commentsDto));

export const adaptCommentToClient =
  (commentDto: CommentDto): Comment =>
    ({
      id: commentDto.offerId,
      comment: commentDto.text,
      rating: commentDto.rating,
      date: commentDto.postDate,
      user: adaptUserToClient(commentDto.user),
    });
