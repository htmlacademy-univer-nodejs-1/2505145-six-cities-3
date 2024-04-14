import { User, UserType } from '../../types/index.js';
import { getModelForClass, prop, defaultClasses, modelOptions } from '@typegoose/typegoose';
import { createSHA256 } from '../../helpers/index.js';

export interface UserEntity extends defaultClasses.Base {
}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})

export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ type: String, required: true, default: ''})
  public name: string;

  @prop({ type: String, unique: true, required: true})
  public email: string;

  @prop({ type: String, required: false, default: ''})
  public avatarImagePath: string;

  @prop({ type: String, required: false, default: UserType.Default})
  public userType: UserType;

  @prop({type: String, required: true, default: ''})
  private password?: string;

  constructor(userData: User) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatarImagePath = userData.avatarImagePath;
    this.userType = userData.userType;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
