import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Header } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { movieResponse, MoviesInterface, Result } from './interfaces/movies.interface';
import { ApiOperation } from '@nestjs/swagger';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) { }





  @ApiOperation({
    summary: 'endpoint obtener peliculas '
  })
  @Get()
  async findAll() {
    try {

      let movies = await this.moviesService.getMoviesAPI();
      return new HttpException(movies, HttpStatus.OK)

    } catch (error) {

      console.log(error)

      return new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }


  @ApiOperation({
    summary: 'endpoint obtener pelicula por id'
  })
  @Get(':id')
  async findOne(@Param('id') id: number) {

    try {

      let movieFind : movieResponse  = await  this.moviesService.findOne(id)
      

      
      return new HttpException(movieFind, HttpStatus.OK)


    } catch (error: any) {

      console.log(error)
      return new HttpException(`${error}`, error.HttpStatus)
    }

  }

  
  @Patch('favorities/add/:id')
  async addFavoriteMovie(@Param('id') id: number, ) {
    
  }
}
