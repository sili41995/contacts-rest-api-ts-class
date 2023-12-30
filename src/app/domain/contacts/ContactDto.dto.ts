import { ErrorMessages, RegExp } from '../../constants';
import { INewContact } from '../../../types/types';
import { IsBoolean, IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { ObjectId } from 'mongoose';

const { emailRegExpErr, phoneRegExpErr, phoneRequiredErr, nameRequiredErr } =
  ErrorMessages;

const { phoneRegExp, emailRegExp } = RegExp;

export class ContactDto implements INewContact {
  _id: ObjectId;

  owner: ObjectId;

  @IsNotEmpty({ message: nameRequiredErr })
  name: string;

  @IsNotEmpty({ message: phoneRequiredErr })
  @Matches(phoneRegExp, { message: phoneRegExpErr })
  phone: string;

  @IsOptional()
  @Matches(emailRegExp, { message: emailRegExpErr })
  email?: string;

  role?: string;

  description?: string;

  tgUsername?: string;

  @IsOptional()
  @IsBoolean()
  favorite?: boolean;

  avatar: string;
}

export default ContactDto;
