export interface IMovie {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string,
}

export interface IMovieDetails {
    Plot?: string;
    imdbRating?: string
    Rated?: string
}