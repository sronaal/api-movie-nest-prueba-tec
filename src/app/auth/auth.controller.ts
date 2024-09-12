import { Controller,  Post, Body, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { loginAuthDTO } from './dto/login-auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signUP(@Body() createAuth: CreateAuthDto ){} 

  @Post()
  login(@Body() loginAuth: loginAuthDTO){}
}
