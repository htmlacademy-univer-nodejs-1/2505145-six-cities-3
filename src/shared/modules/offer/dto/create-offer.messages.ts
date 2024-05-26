export const CreateOfferValidationMessage = {
  name: {
    minLength: 'Minimum name length must be 10',
    maxLength: 'Maximum name length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  datePublished: {
    invalidFormat: 'datePublished must be a valid ISO date',
  },
  city: {
    invalidFormat: 'Must be one of Paris, Cologne, Brussels, Amsterdam, Hamburg, Dusseldorf',
  },
  previewImagePath: {
    maxLength: 'Maximum previewImagePath length must be 256',
  },
  photosPaths: {
    invalidFormat: 'Must be an array',
  },
  isPremium: {
    invalid: 'Must be boolean',
  },
  isFavorite: {
    invalidFormat: 'Must be boolean',
  },
  rating: {
    invalidFormat: 'rating must be a valid number',
    min: 'Minimum rating must be 1',
    max: 'Maximum rating must be 5',
  },
  housingType: {
    invalidFormat: 'Must be one of Apartment, House, Room, Hotel',
  },
  numberRooms: {
    invalidFormat: 'numberRooms must be a valid int',
    min: 'Minimum numberRooms must be 1',
    max: 'Maximum numberRooms must be 8',
  },
  numberGuests: {
    invalidFormat: 'numberGuests must be a valid int',
    min: 'Minimum numberGuests must be 1',
    max: 'Minimum numberGuests must be 10',
  },
  rentPrice: {
    invalidFormat: 'rentPrice must be a valid int',
    min: 'Minimum rentPrice must be 100',
    max: 'Maximum rentPrice must be 100000',
  },
  facilities: {
    invalidFormat: 'Must be an array',
    invalidElementFormat:
      'Element must be one of Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels, Fridge',
  },
} as const;
