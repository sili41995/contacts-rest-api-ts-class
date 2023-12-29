import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';
import { IContact } from '../../../types/types';
import { Expose } from 'class-transformer';

class UpdateContactDto implements Omit<IContact, 'owner' | '_id'> {}

export default UpdateContactDto;
