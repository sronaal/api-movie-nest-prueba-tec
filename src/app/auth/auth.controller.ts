import { Controller, Post, Body, HttpException, HttpStatus, Put, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { loginAuthDTO } from './dto/login-auth.dto'
import { AuthSucessDTO } from './interfaces/AuthSuccess.interface';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) { }

  @Post('signup')
  async signUP(@Body() createAuth: CreateAuthDto) {


    try {


      //console.log(createAuth)


      let findUserByEmail = await this.userService.findByEmail(createAuth.email)

      if (findUserByEmail) return new HttpException(`El email ${createAuth.email} ya se encuentra registrado`, HttpStatus.FOUND)

      let findUserByUser = await this.userService.findByUser(createAuth.user)

      if (findUserByUser) return new HttpException(`El usuario ${createAuth.user} ya se encuentra registrado`, HttpStatus.FOUND)

      let usuario = await this.authService.registroUsuario(createAuth)

      if (!usuario) return new HttpException({ "mensaje": "Error creación usuario", usuario }, HttpStatus.BAD_GATEWAY)


      return new HttpException({ "mensaje": "Usuario Creado" }, HttpStatus.ACCEPTED)

    } catch (error) {
      console.log(error)
      return new HttpException({ "mensaje": "Error creación usuario", error }, HttpStatus.BAD_GATEWAY)
    }
  }

  @Post('login')
  async login(@Body() loginAuth: loginAuthDTO) {

    try {
      console.log(loginAuth)


      const usuarioAuth = await this.authService.findUserEmail(loginAuth.email)

      if (!usuarioAuth) return new HttpException('Credenciales Invalidas', HttpStatus.FORBIDDEN)


      if (!this.authService.validarContraseña(loginAuth.password, usuarioAuth.password)) return new HttpException('Credenciales Invalidas', HttpStatus.FORBIDDEN)


      let token = await this.authService.generarJWTAuth({ "IdUsuario": usuarioAuth.id, "correo": usuarioAuth.email })
      const resposeAuth: AuthSucessDTO = {

        IdUsuario: String(usuarioAuth.id),
        correo: usuarioAuth.email,
        mensaje: 'Autenticación Exitosa',
        token
      }

      return new HttpException(resposeAuth, HttpStatus.ACCEPTED)


    } catch (error) {
      console.log(error, new Date().toLocaleDateString)
      return new HttpException('Error Servidor', HttpStatus.BAD_REQUEST)
    }
  }

  @Put('change-password')
  async changePassword(){
    
  }


}
