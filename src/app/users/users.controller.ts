import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }




  @ApiOperation({
    summary: 'Obtener usuarios activos'
  })
  @Get()
  findAll() {


    return this.usersService.findAll();
  }


  @ApiOperation({
    summary: 'Buscar usuario activo por id'
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {


    try {
      let userFInd = await this.usersService.findOne(id);

      if (!userFInd) return new HttpException(`User with id ${id} not found`, HttpStatus.NOT_FOUND)
   
      return new HttpException(userFInd, HttpStatus.OK)
      } catch (error) {

      return new HttpException(`User with id ${id} not found`, HttpStatus.NOT_FOUND)

    }
  }




  @Patch(':id') 
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {

    let userUpdate = await this.usersService.findOne(id)

    if (!userUpdate) return new HttpException(`User Id ${id} not found`, HttpStatus.NOT_FOUND)

    let update = await this.usersService.update(id, updateUserDto);

    return new HttpException(`User update ${update}`, HttpStatus.OK)
  }


  @ApiOperation({
    summary: 'Eliminacion de usuario sin eliminar de base de datos desactiva el usuario'
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {

    try {

      let findUserDelete = await this.usersService.findOne(id)

      if (!findUserDelete) return new HttpException(`User Id ${id} not found`, HttpStatus.NOT_FOUND)

      let user = await this.usersService.remove(id, findUserDelete);

      return new HttpException(`Usuario eliminado ${user.id}`, HttpStatus.ACCEPTED)

    } catch (error) {

      return new HttpException(`Error eliminacion usuario ${error}`, HttpStatus.BAD_REQUEST)
    }
  }
}
