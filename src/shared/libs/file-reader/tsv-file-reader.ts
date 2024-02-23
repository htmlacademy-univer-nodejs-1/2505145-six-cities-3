import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { City, Facilities, HousingType, Offer, User, UserType } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filePath: string
  ) {
  }

  public read(): void {
    try {
      this.rawData = readFileSync(this.filePath, 'utf-8');
    } catch (error: unknown) {
      console.error(`Filed to read data from ${this.filePath}`);

      if (error instanceof Error)
        console.error(error.message);
    }
  }

  public toArray(): Offer[] {
    if (!this.rawData)
      throw new Error('File was not read');

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([name, description, datePublished, city, previewImagePath, photosPaths, isPremium, isFavorite, rating, housingType, numberRooms, numberGuests, rentPrice, facilities, authorName, authorEmail, autorImagePath, autorType, numberComments, coordinates]) => ({
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
        numberRooms: parseInt(numberRooms),
        numberGuests: parseInt(numberGuests),
        rentPrice: parseInt(rentPrice),
        facilities: facilities.split(';').map((facility) => facility as Facilities),
        author: {name: authorName, email: authorEmail, avatarImagePath: autorImagePath, userType: autorType as UserType} as User,
        numberComments: parseInt(numberComments),
        coordinates
      }));
  }
}
