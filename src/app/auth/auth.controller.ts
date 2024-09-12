import { Controller, Post, Body, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { loginAuthDTO } from './dto/login-auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('create')
  signUP(@Body() createAuth: CreateAuthDto) {


    try {

      console.log()
    } catch (error) {

    }
  }

  @Post('login')
  login(@Body() loginAuth: loginAuthDTO) {

    try {
      console.log(loginAuth)
    } catch (error) {

    }
  }


}
