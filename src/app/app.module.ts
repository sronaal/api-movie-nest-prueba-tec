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
      host: process.env.DATABASE_HOST || 'localhost',
      port: Number(process.env.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USER || 'desarrollo',
      password: process.env.DATABASE_PASSWORD || 'desarrollo',
      database: process.env.DATABASE_NAME || 'desarrollo',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Solo en desarrollo
    }),
    


    AuthModule, UsersModule, MoviesModule
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
