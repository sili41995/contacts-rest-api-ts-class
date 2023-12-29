import { JsonController, Get, Post, Body, Param } from 'routing-controllers';
import { IContact, IUser } from '../../../types/types';
import { Contact } from '../../models/contact';
import { ApiError, ApiResponse } from '../../../utils';
import ContactDto from './ContactDto.dto';
import { validate } from 'class-validator';

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

  // @Get('/:id')
  // async getOne(@Param('id') id: string): Promise<IPerson | {}> {
  //   //   const person = storeData.find((item) => {
  //   //     return item.id === id;
  //   //   });
  //   //   return person || {};
  // }

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
}

export default Contacts;
