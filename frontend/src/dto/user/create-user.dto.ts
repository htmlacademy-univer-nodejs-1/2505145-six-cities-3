import { UserType } from '../../const.js';

export class CreateUserDto {
  public name!: string;

  public email!: string;

  public avatarImagePath!: string

  public userType!: UserType;

  public password!: string;
}
