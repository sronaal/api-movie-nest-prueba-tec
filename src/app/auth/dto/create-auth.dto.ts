import { ApiProperty } from '@nestjs/swagger'
import {  IsEmail, IsNotEmpty, isNotEmpty, IsString } from 'class-validator'

export class CreateAuthDto {



    @ApiProperty()
    @IsEmail({})
    @IsNotEmpty({message: 'El correo es obligatorio'})
    email!: string


    @ApiProperty()
    @IsNotEmpty({message: 'La contraseña es obligatoria'})
    password!: string

    @ApiProperty()
    @IsNotEmpty({ message:'El usuario es os obligatorio'})
    user:string

    @ApiProperty()
    nombre_completo : string
}

