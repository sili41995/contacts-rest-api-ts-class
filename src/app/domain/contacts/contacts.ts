import {
  JsonController,
  Get,
  Post,
  Body,
  Param,
  Put,
  All,
  NotFoundError,
  UseBefore,
} from 'routing-controllers';
import { IContact, IUser } from '../../../types/types';
import { Contact } from '../../models/contact';
import { ApiError, ApiResponse } from '../../../utils';
import ContactDto from './ContactDto.dto';
import { validate } from 'class-validator';
// import UpdateContactDto from './UpdateContactDto.dto';
import { plainToClass } from 'class-transformer';
import UpdateContactDto from './UpdateContactDto.dto';
import { ErrorMessages } from 'app/constants';
import isValidId from 'app/middlewares/isValidId';

const { emptyBodyErr } = ErrorMessages;

@JsonController('/contacts')
class Contacts {
  @Get()
  async getAll() {
    const filter = '-description -tgUsername';
    const result = await Contact.find({}, filter);
    const count = await Contact.find({}).countDocuments();
    const response = {
      contacts: result,
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

    return new ApiResponse(true, result);
  }

  @Post()
  async setContact(@Body() body: ContactDto) {
    const errors = await validate(body);

    if (errors.length) {
      throw new ApiError(400, {
        message: 'Validation failed',
        code: 'CONTACT_VALIDATION_ERROR',
        errors,
      });
    }

    const result = await Contact.create(body);

    return new ApiResponse(true, result);
  }

  @Put('/:id')
  @UseBefore(isValidId)
  async updateContact(
    @Body() body: UpdateContactDto,
    @Param('id') id: string
  ): Promise<ApiResponse<IContact>> {
    if (Object.keys(body).length === 0) {
      throw new ApiError(400, {
        code: 'BODY_VALIDATION_ERROR',
        message: emptyBodyErr,
      });
    }

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

    return new ApiResponse(true, result);
  }
}

export default Contacts;
