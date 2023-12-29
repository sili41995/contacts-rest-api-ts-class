import {
  JsonController,
  Get,
  Post,
  Body,
  Param,
  Put,
} from 'routing-controllers';
import { IContact, IUser } from '../../../types/types';
import { Contact } from '../../models/contact';
import { ApiError, ApiResponse } from '../../../utils';
import ContactDto from './ContactDto.dto';
import { validate } from 'class-validator';
import UpdateContactDto from './UpdateContactDto.dto';
import { plainToClass } from 'class-transformer';

@JsonController('/contacts')
class Contacts {
  @Get()
  async getAll() {
    const filter = '-description -tgUsername';
    const result = await Contact.find({}, filter);
    const count = await Contact.find({}).countDocuments();
    const response = {
      contacts: ContactDto.fromObject(result),
      count,
    };

    return new ApiResponse(true, response);
  }

  @Get('/:id')
  async getOne(@Param('id') id: string): Promise<ApiResponse<IContact>> {
    const result = await Contact.findOne({ _id: id });

    if (!result) {
      throw new ApiError(404, {
        code: 'CONTACT_NOT_FOUND',
        message: `Contact with id ${id} not found`,
      });
    }

    const contact = ContactDto.fromObject(result);
    return new ApiResponse(true, contact);
  }

  @Post()
  async setContact(@Body() body: ContactDto) {
    const errors = await validate(body);
    console.log(errors.length);
    if (errors.length) {
      throw new ApiError(400, {
        message: 'Validation failed',
        code: 'CONTACT_VALIDATION_ERROR',
        errors,
      });
    }

    const result = await Contact.create(body);

    return new ApiResponse(true, ContactDto.fromObject(result));
  }

  @Put('/:id')
  async updateContact(
    @Body() body: UpdateContactDto,
    @Param('id') id: string
  ): Promise<ApiResponse<IContact>> {
    const validationDTO = plainToClass(UpdateContactDto, body);
    console.log(validationDTO);
    const errors = await validate(body);

    if (errors.length) {
      throw new ApiError(400, {
        message: 'Validation failed',
        code: 'CONTACT_VALIDATION_ERROR',
        errors,
      });
    }

    const result = await Contact.findOneAndUpdate({ _id: id }, body);

    if (!result) {
      throw new ApiError(404, {
        code: 'CONTACT_NOT_FOUND',
        message: `Contact with id ${id} not found`,
      });
    }

    const contact = ContactDto.fromObject(result);
    return new ApiResponse(true, contact);
  }
}

export default Contacts;
