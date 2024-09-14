import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { movieResponse, MoviesInterface, Result } from './interfaces/movies.interface';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) { }

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
