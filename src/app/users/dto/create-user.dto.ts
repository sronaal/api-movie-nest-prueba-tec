import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"

export class CreateUserDto {

    @IsEmail({})
    @IsNotEmpty({message: 'El correo es obligatorio'})
    @ApiProperty()
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
