export const CreateCommentMessages = {
  offerId: {
    invalidFormat: 'offerId field must be a valid id'
  },
  text: {
    invalidFormat: 'text is required',
    lengthField: 'min length is 5, max is 2024'
  },
  rating: {
    invalidFormat: 'rating must be a valid number',
    min: 'Minimum rating must be 1',
    max: 'Maximum rating must be 5',
  },
  userId: {
    invalidFormat: 'userId field must be a valid id'
  },
} as const;
