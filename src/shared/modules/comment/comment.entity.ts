import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/index.js';
import { OfferEntity } from '../offer/index.js';

export interface CommentEntity extends defaultClasses.Base {
}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})


export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({
    ref: OfferEntity,
    required: true,
    type: String
  })
  public offerId: Ref<OfferEntity>;

  @prop({type: String, minlength: 5, maxlength: 1024, trim: true, required: true})
  public text: string;

  @prop({type: Number, min: 1, max: 5, required: true})
  public rating: number;

  @prop({type: Date})
  public postDate: Date;

  @prop({
    ref: UserEntity,
    required: true,
    type: String
  })
  public userId: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
