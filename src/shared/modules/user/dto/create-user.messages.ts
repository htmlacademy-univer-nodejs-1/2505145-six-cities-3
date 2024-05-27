export const CreateUserMessages = {
  name: {
    invalidFormat: 'name is required',
    lengthField: 'min length is 1, max is 15',
  },
  email: {
    invalidFormat: 'email must be a valid email address'
  },
  avatarImagePath: {
    invalidFormat: 'avatarImagePath is required',
  },
  userType: {
    invalidFormat: 'Must be one of: Default, Pro',
  },
  password: {
    invalidFormat: 'password is required',
    lengthField: 'min length for password is 6, max is 12'
  },
} as const;
