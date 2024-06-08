import { UserType } from '../../const.js';

export class UserWithIdDto {
  public id!: string;

  public name!: string;

  public email!: string;

  public avatarImagePath!: string

  public userType!: UserType;
}
