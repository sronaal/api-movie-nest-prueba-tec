import { IsEmail, IsNotEmpty } from "class-validator"

export class CreateUserDto {

    @IsEmail({})
    @IsNotEmpty({message: 'El correo es obligatorio'})
    email!: string


    @IsNotEmpty({message: 'La contraseña es obligatoria'})
    password!: string

    @IsNotEmpty({ message:'El usuario es os obligatorio'})
    user:string


    nombre_completo : string
}
