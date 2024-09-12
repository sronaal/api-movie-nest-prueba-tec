import { Module } from "@nestjs/common";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from "./users/entities/user.entity";

@Module({
  imports: [

    // Se realiza la configuracín de la base de datos 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: Number(process.env.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || 'root_password',
      database: process.env.DATABASE_NAME || 'desarrollo',
      entities: [User],
      synchronize: true, // Solo en desarrollo
    }),
    


    AuthModule, UsersModule, MoviesModule
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
