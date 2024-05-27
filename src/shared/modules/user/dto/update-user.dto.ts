import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { CreateUserMessages } from './create-user.messages.js';
import { UserType } from '../../../types/index.js';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: CreateUserMessages.name.invalidFormat })
  @Length(1, 15, { message: CreateUserMessages.name.lengthField })
  public name?: string;

  @IsOptional()
  @IsString({ message: CreateUserMessages.avatarImagePath.invalidFormat })
  public avatarImagePath?: string;

  @IsOptional()
  @IsEnum(UserType, { message: CreateUserMessages.userType.invalidFormat })
  public type?: UserType;
}
