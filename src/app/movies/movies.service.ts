import { Inject, Injectable } from '@nestjs/common';

import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { HttpService } from '@nestjs/axios';
import { Cache } from 'cache-manager'
import { MoviesInterface, Result } from './interfaces/movies.interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';


@Injectable()
export class MoviesService {

  private url_api: string = "https://api.themoviedb.org/3/"
  private config_http = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNGNlMmQ2MDE0NDhkYzI0YjNmOThkMGIyMGY0YjY0MyIsIm5iZiI6MTcyNjE4ODg4NS4xNTY5MDksInN1YiI6IjY2NTkwMzAzOWNkNDFiMjg3YTkzZWQ0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pc-wd8a8_D5MDF5dzpfcldbDasLdxhj-K7EF7G6QY5A'
    }
  }

  private token_web: string | undefined = process.env.TOKEN_WEB_API || 'eyJhbGciOiJIUzIZ1NiJ9.eyJhdWQiOiJhNGNlMmQ2MDE0NDhkYzI0YjNmOThkMGIyMGY0YjY0MyIsIm5iZiI6MTcyNjE4ODg4NS4xNTY5MDksInN1YiI6IjY2NTkwMzAzOWNkNDFiMjg3YTkzZWQ0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pc-wd8a8_D5MDF5dzpfcldbDasLdxhj-K7EF7G6QY5A '
  constructor(
    private httpService: HttpService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache
  ) {

  }

  getMoviesAPI() {



    return new Promise<MoviesInterface | Result>(async (resolve, reject) => {

      try {



        const moviesCache = await this.cacheManager.get<MoviesInterface>('movies')
        if (moviesCache) return resolve(moviesCache)

        let { data } = await this.httpService.axiosRef.get<Result>(`${this.url_api}movie/now_playing?language=en-US&page=1`, this.config_http)

        await this.cacheManager.set('movies', data, 10000)

        return resolve(data)

      } catch (error) {

        return reject(error)
      }

    })

  }


  create(createMovieDto: CreateMovieDto) {
    return 'This action adds a new movie';
  }

  findAll() {


    return this.getMoviesAPI()
  }


  findOne(id: number) {

    return new Promise<MoviesInterface | Result>(async (resolve, reject) => {

      try {

        const movieCache = await this.cacheManager.get<MoviesInterface>('movieid')

        if (movieCache) return resolve(movieCache)

        let { data } = await this.httpService.axiosRef.get<Result>('')

        await this.cacheManager.set('movieid', data, 1000)

        return resolve(data)
      
      } catch (error) {

        return reject(error)
      }

    })
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
