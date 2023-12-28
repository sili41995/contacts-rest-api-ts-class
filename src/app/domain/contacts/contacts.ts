import { JsonController, Get, Post, Body, Param } from 'routing-controllers';
import { IContact, IUser } from '../../../types/types';
import { Contact } from '../../models/contact';
import { ApiResponse } from '../../../utils';

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

  // @Get('/:id')
  // async getOne(@Param('id') id: string): Promise<IPerson | {}> {
  //   //   const person = storeData.find((item) => {
  //   //     return item.id === id;
  //   //   });
  //   //   return person || {};
  // }
  // @Post()
  // // async setPerson(@Body() body: IPerson) {
  // //   //   storeData.push(body);
  // //   //   return true;
  // // }
}

export default Contacts;
