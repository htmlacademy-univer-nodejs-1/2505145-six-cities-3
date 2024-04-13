import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import { getRandomItem, getRandomItems, generateRandomValue, } from '../../helpers/index.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 14;

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_ROOM_COUNT = 1;
const MAX_ROOM_COUNT = 8;

const MIN_GUEST_COUNT = 1;
const MAX_GUEST_COUNT = 10;

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const MIN_COMMENTS_COUNT = 0;
const MAX_COMMENTS_COUNT = 30;

export class TsvOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {
  }

  generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItem<string>(this.mockData.cities);
    const previewPhoto = getRandomItem<string>(this.mockData.previewPhotos);
    const photos = getRandomItems<string>(this.mockData.photos, 6).join(';');
    const isPremium = getRandomItem<boolean>([true, false]).toString();
    const isFavorite = getRandomItem<boolean>([true, false]).toString();
    const rating = generateRandomValue(MIN_RATING, MAX_RATING).toString();
    const type = getRandomItem<string>(this.mockData.types);
    const roomCount = generateRandomValue(MIN_ROOM_COUNT, MAX_ROOM_COUNT).toString();
    const guestCount = generateRandomValue(MIN_GUEST_COUNT, MAX_GUEST_COUNT).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const facilities = getRandomItems<string>(this.mockData.facilities).join(';');
    const author = getRandomItem<string>(this.mockData.authorNames);
    const email = getRandomItem<string>(this.mockData.authorEmails);
    const avatarPath = getRandomItem<string>(this.mockData.authorAvatars);
    const authorType = getRandomItem<string>(this.mockData.authorTypes);
    const numberComments = generateRandomValue(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT);
    const coordinates = getRandomItem<string>(this.mockData.coordinates);

    return [
      title, description, postDate, city, previewPhoto, photos, isPremium,
      isFavorite, rating, type, roomCount, guestCount, price, facilities,
      author, email, avatarPath, authorType, numberComments, coordinates
    ].join('\t');
  }

}
