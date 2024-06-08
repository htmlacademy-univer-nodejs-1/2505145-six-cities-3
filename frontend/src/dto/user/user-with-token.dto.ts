import { UserType } from '../../const.js';

export class UserWithTokenDto {
  public name!: string;

  public email!: string;

  public avatarImagePath!: string

  public userType!: UserType;

  public token!: string;
}
