import { hash } from "crypto";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid} from 'uuid'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number ;


    @Column()
    nombre_completo: string;

    @Column()
    usuario: string;

    @Column()
    correo: string;

    @Column()
    password: string;


    @BeforeInsert()
    hashPassword(){
        let hashPassword = hash(this.password,2)
        this.password = hashPassword
    }

}


