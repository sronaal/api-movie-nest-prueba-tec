import { Module } from "@nestjs/common";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [

    // Se realiza la configuracín de la base de datos 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.db_ip || 'localhost',
      port: 3306,
      username:process.env.db_user || 'desarrollo',
      password:process.env.db_password || 'password',
      database: process.env.db_name || 'crm',
      //entities:[Usuario, Observaciones,Proyecto, Rol],
      autoLoadEntities:true,
      synchronize:true
    }),


    AuthModule, UsersModule, MoviesModule
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
