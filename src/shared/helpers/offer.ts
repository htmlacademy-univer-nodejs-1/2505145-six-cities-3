import { City, Facilities, HousingType, Offer, User, UserType } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const offer: string[] = [];
  let currentData: string[] = [];

  for (const char of offerData) {
    if (char === '\t' || char === '\n') {
      offer.push(currentData.join(''));
      currentData = [];
    } else {
      currentData.push(char);
    }

    if (char === '\n') {
      break;
    }
  }

  const [
    name,
    description,
    datePublished,
    city,
    previewImagePath,
    photosPaths,
    isPremium,
    isFavorite,
    rating,
    housingType,
    numberRooms,
    numberGuests,
    rentPrice,
    facilities,
    authorName,
    authorEmail,
    authorImagePath,
    authorType,
    numberComments,
    coordinates
  ] = offer;

  return {
    name,
    description,
    datePublished: new Date(datePublished),
    city: city as City,
    previewImagePath,
    photosPaths: photosPaths.split(';'),
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    rating: parseFloat(rating),
    housingType: housingType as HousingType,
    numberRooms: parseInt(numberRooms, 10),
    numberGuests: parseInt(numberGuests, 10),
    rentPrice: parseInt(rentPrice, 10),
    facilities: facilities.split(';').map((facility) => facility as Facilities),
    author: {
      name: authorName,
      email: authorEmail,
      avatarImagePath: authorImagePath,
      userType: authorType as UserType
    } as User,
    numberComments: parseInt(numberComments, 10),
    coordinates
  } as Offer;
}
