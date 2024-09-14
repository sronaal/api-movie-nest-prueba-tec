export interface MoviesInterface {

    page:          number;
    results:       Result[];

}



export interface Result {
    adult:             boolean;
    backdrop_path:     string;
    genre_ids:         number[];
    id:                number;
    original_title:    string;
    overview:          string;
    popularity:        number;
    poster_path:       string;
    release_date:      Date;
    title:             string;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
}


export interface movieResponse {

    name: string
    genero: number[]
    rating : number
    fecha_estreno : Date;
    resumen : string
}