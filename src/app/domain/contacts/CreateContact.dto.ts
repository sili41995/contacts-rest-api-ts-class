import { INewContact } from '../../../types/types';
import { Expose, Type, plainToClass } from 'class-transformer';
import { ObjectId } from 'mongoose';

export class CreateContact implements Omit<INewContact, '_id'> {
  @Expose({ name: '_id' })
  @Type(() => String)
  _id: ObjectId;

  @Expose()
  name: string;

  @Expose()
  phone: string;

  @Expose()
  email?: string;

  @Expose()
  role?: string;

  @Expose()
  description?: string;

  @Expose()
  tgUsername?: string;

  @Expose()
  favorite?: boolean;

  @Expose()
  avatar: string;

  static fromObject(object: Record<string, any>): CreateContact {
    return plainToClass(CreateContact, object, {
      excludeExtraneousValues: true,
    });
  }
}

export default CreateContact;
