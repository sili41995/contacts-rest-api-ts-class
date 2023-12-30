import {
  IsBoolean,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  Matches,
  Min,
  ValidateNested,
} from 'class-validator';
import { IContact } from '../../../types/types';
import { Expose } from 'class-transformer';
import { ErrorMessages, RegExp } from '../../constants';

const { phoneRegExpErr, emailRegExpErr } = ErrorMessages;
const { phoneRegExp, emailRegExp } = RegExp;

class UpdateContactDto implements Omit<IContact, 'owner' | '_id'> {
  name: string;

  @IsOptional()
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

export default UpdateContactDto;
