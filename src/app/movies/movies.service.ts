import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { HttpService } from '@nestjs/axios';
import { Cache } from 'cache-manager'
import { movieResponse, MoviesInterface, Result } from './interfaces/movies.interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';


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


    return new Promise<movieResponse>(async (resolve, reject) => {

      try {

        const movieCache = await this.cacheManager.get<Result>('movieid')

        if (movieCache) {

          let movie: movieResponse = {
            "name": movieCache.title,
            "genero": movieCache.genre_ids,
            "rating": movieCache.popularity,
            "fecha_estreno": movieCache.release_date,
            "resumen": movieCache.overview
          }

          return resolve(movie)
        }


        let { data } = await this.httpService.axiosRef.get<Result>(`${this.url_api}movie/${id}`, this.config_http)

        await this.cacheManager.set('movieid', data, 1000)

        let movie: movieResponse = {

          "name": data.title,
          "genero": data.genre_ids,
          "rating": data.popularity,
          "fecha_estreno": data.release_date,
          "resumen": data.overview
        }

        return resolve(movie)

      } catch (error: any) {

        if (error.status === 404) return reject(new HttpException(`movie with id ${id} not found`, HttpStatus.NOT_FOUND))

        if (error.status === 401) return reject(new HttpException(`api movie not found `, HttpStatus.UNAUTHORIZED))

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
