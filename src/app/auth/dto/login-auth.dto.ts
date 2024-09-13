import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class loginAuthDTO{

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty({message: 'El correo es obligatorio'})
    email: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty({message: "La contraseña es obligatoria"})
    password: string
}