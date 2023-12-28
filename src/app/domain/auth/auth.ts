import { JsonController, Get, Post, Body, Param } from 'routing-controllers';

@JsonController('/auth')
class Auth {
  //   @Get()
  //   async getAll() {
  //     //   return storeData;
  //   }
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

export default Auth;
