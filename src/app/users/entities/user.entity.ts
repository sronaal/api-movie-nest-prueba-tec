import { hash } from "crypto";
import { BeforeInsert, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import * as md5 from 'md5'

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")

    id: string

    @Column({ nullable: true })
    nombre_completo: string;

    @Column()
    user: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: false })
    isDeleted: boolean;

    @BeforeInsert()
    hashPassword() {
       let hash_password = md5(this.password)
       this.password = hash_password
    }

}


