import { Controller, Post, Body, HttpException, HttpStatus, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { loginAuthDTO } from './dto/login-auth.dto'
import { AuthSucessDTO } from './interfaces/AuthSuccess.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async signUP(@Body() createAuth: CreateAuthDto) {


    try {
      console.log(createAuth)

      let usuario = await this.authService.registroUsuario(createAuth)

      if (!usuario) return new HttpException({ "mensaje": "Error creación usuario", usuario }, HttpStatus.BAD_GATEWAY)

      console.log(usuario)

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


      const resposeAuth: AuthSucessDTO = {

        IdUsuario: String(usuarioAuth.id),
        correo: usuarioAuth.email,
        rol: '',
        mensaje: 'Autenticación Exitosa',
        token: ''
      }

      return new HttpException(resposeAuth, HttpStatus.ACCEPTED)


    } catch (error) {
      console.log(error, new Date().toLocaleDateString)
      return new HttpException('Error Servidor', HttpStatus.BAD_REQUEST)
    }
  }


}
