import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class loginAuthDTO{

    @IsEmail()
    @IsNotEmpty({message: 'El correo es obligatorio'})
    email: string

    @IsString()
    @IsNotEmpty({message: "La contraseña es obligatoria"})
    password: string
}