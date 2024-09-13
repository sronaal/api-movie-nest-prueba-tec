import { Module } from "@nestjs/common";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { User } from "./users/entities/user.entity";
import { CacheModule } from "@nestjs/cache-manager";
import { redisStore, RedisStore } from "cache-manager-redis-yet";

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env.dev'
    }),

    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        return {
          store: await redisStore({
            socket: {
              host: 'localhost',
              port: 6379,
            },
            password: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81'
          }),
        };
      },
    }),


    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: Number(process.env.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || 'root_password',
      database: process.env.DATABASE_NAME || 'desarrollo',
      entities: [User],
      synchronize: true,
    }),

    TypeOrmModule.forFeature([User]),

    AuthModule, UsersModule, MoviesModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule { }
