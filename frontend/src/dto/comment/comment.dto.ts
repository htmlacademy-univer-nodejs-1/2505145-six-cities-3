import { UserDto } from '../user/user.dto.js';

export class CommentDto {
  public offerId!: string;
  public text!: string;
  public rating!: number;
  public postDate!: string;
  public user!: UserDto;
}
