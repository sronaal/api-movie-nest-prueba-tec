import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
  
    constructor(
        @InjectRepository(User)
        private userRepository : Repository<User>
        
    ){}

    async findUserEmail(email: string){

        return  this.userRepository.findOne({
            where: { email } 
        })
    }


    validarContraseña(password: string,hash_password: string){

        return true
    }
    
    registroUsuario(createUser: CreateAuthDto){

        let usuario = this.userRepository.create( createUser )
        
        return this.userRepository.save(usuario)


    }

}
