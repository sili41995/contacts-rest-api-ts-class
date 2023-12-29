import { ErrorMessages, RegExp } from '../../constants';
import { INewContact } from '../../../types/types';
import { Expose, Type, plainToClass } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { ObjectId } from 'mongoose';

const { emailRegExpErr, phoneRegExpErr, phoneRequiredErr, nameRequiredErr } =
  ErrorMessages;

const { phoneRegExp, emailRegExp } = RegExp;

export class ContactDto implements INewContact {
  @Expose({ name: '_id' })
  @Type(() => String)
  _id: ObjectId;

  @Expose()
  @IsNotEmpty({ message: nameRequiredErr })
  name: string;

  @Expose()
  @IsNotEmpty({ message: phoneRequiredErr })
  @Matches(phoneRegExp, { message: phoneRegExpErr })
  phone: string;

  @Expose()
  @IsOptional()
  @Matches(emailRegExp, { message: emailRegExpErr })
  email?: string;

  @Expose()
  role?: string;

  @Expose()
  description?: string;

  @Expose()
  tgUsername?: string;

  @Expose()
  @IsOptional()
  @IsBoolean()
  favorite?: boolean;

  @Expose()
  avatar: string;

  static fromObject(object: Record<string, any>): ContactDto {
    return plainToClass(ContactDto, object, {
      excludeExtraneousValues: true,
    });
  }
}

export default ContactDto;
