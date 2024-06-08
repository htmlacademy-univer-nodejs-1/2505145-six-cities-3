import { UserType } from '../../const.js';

export class UserDto {
  public name!: string;

  public email!: string;

  public avatarImagePath!: string

  public userType!: UserType;
}
