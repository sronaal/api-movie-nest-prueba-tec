import {  IsEmail, IsNotEmpty, isNotEmpty, IsString } from 'class-validator'

export class CreateAuthDto {


    @IsEmail({})
    @IsNotEmpty({message: 'El correo es obligatorio'})
    correo!: string


    @IsNotEmpty({message: 'La contraseña es obligatoria'})
    password!: string
}

