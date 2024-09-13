import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
   
    let userUpdate = await this.usersService.findOne(id)

    if(! userUpdate ) return new HttpException(`User Id ${id} not found`, HttpStatus.NOT_FOUND)
    
    let update = await this.usersService.update(id, updateUserDto);

    return new HttpException(`User update ${update}`, HttpStatus.OK)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    
    try {
      
      let findUserDelete = await this.usersService.findOne(id)

      if( !findUserDelete ) return new HttpException(`User Id ${id} not found`, HttpStatus.NOT_FOUND )

      let user = await this.usersService.remove(id, findUserDelete);
      
      return new HttpException(`Usuario eliminado ${user}`, HttpStatus.ACCEPTED) 

    } catch (error) {
      
      return new HttpException(`Error eliminacion usuario ${error}`, HttpStatus.BAD_REQUEST)
    }
  }
}
