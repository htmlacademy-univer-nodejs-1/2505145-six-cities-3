import { UserType } from '../../../types/index.js';
import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose()
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public avatarImagePath: string;

  @Expose()
  public userType: UserType;
}
