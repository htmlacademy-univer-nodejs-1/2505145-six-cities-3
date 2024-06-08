import { UserType } from '../../const.js';

export class UpdateUserDto {
  public name?: string;

  public avatarImagePath?: string;

  public type?: UserType;
}
