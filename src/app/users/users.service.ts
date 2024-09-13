import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }


  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return this.userRepository.find({
      select: {
        id: true,
        email: true,
        nombre_completo: true,
        user: true,
        password: false,
        isDeleted: true
      },
      where: { isDeleted: false }
    })
  }

  findByEmail(email: string) {

    return this.userRepository.findOne({ where: { email, isDeleted: false } })
  }

  findByUser(user: string) {

    return this.userRepository.findOne({ where: { user } })
  }

  findOne(id: string) {

    return this.userRepository.findOne({
      select: {
        id: true,
        email: true,
        nombre_completo: true,
        user: true,
        password: false,
        isDeleted: true
      },

      where: { id, isDeleted: false }
    }

    )

  }

  update(id: string, updateUserDto: UpdateUserDto) {


    return this.userRepository.update(id, updateUserDto)

  }

  remove(id: string, userDelete: User) {

    return new Promise<User>(async (resolve, reject) => {

      try {

        userDelete.isDeleted = true
        let userInactive = await this.userRepository.save(userDelete)

        return resolve(userInactive)

      } catch (error) {
        console.log(error)
        return reject(error)
      }


    })




  }
}
