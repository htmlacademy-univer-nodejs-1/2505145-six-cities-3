import { UserType } from '../../../types/index.js';
import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { CreateUserMessages } from './create-user.messages.js';

export class CreateUserDto {
  @IsString({ message: CreateUserMessages.name.invalidFormat })
  @Length(1, 15, { message: CreateUserMessages.name.lengthField })
  public name: string;

  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email: string;

  @IsEnum(UserType, { message: CreateUserMessages.userType.invalidFormat })
  public userType: UserType;

  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(6, 12, { message: CreateUserMessages.password.lengthField })
  public password: string;
}
