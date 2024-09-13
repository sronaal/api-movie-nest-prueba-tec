import { Repository } from 'typeorm';
import * as md5 from 'md5'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthSucessDTO } from './interfaces/AuthSuccess.interface';



@Injectable()
export class AuthService {
  
    constructor(
        @InjectRepository(User)
        private readonly userRepository : Repository<User>,
        private readonly jwtService: JwtService 
        
    ){}

    async findUserEmail(email: string){

        return  this.userRepository.findOne({
            where: { email } 
        })
    }

    async generarJWTAuth(data: AuthSucessDTO) {

        return this.jwtService.signAsync(data)

    }

    async decodificarToken(token: string) {

        return this.jwtService.decode(token)


    }

    validarContraseña(password: string,hash_password: string){

        if ( md5(password)  === hash_password) return true

        return false
    }
    
    registroUsuario(createUser: CreateAuthDto){

        let usuario = this.userRepository.create( createUser )
        
        return this.userRepository.save(usuario)


    }

}
