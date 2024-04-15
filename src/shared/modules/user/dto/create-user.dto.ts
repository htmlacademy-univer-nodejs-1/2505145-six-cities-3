import { UserType } from '../../../types/index.js';

export class CreateUserDto {
  public name: string;
  public email: string;
  public avatarImagePath: string;
  public userType: UserType;
  public password: string;
}
