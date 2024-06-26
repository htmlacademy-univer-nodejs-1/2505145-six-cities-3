import { CreateUserMessages } from './create-user.messages.js';
import { IsEmail, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email: string;

  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(6, 12, { message: CreateUserMessages.password.lengthField })
  public password: string;
}
