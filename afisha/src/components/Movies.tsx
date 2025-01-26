// import React from 'react';
// import {Movie} from './Movie.js';
import {Movie} from "./Movie.tsx";
import {IMovie} from "../types/Types.ts";
// import PropTypes from "prop-types";


interface IMovies {
    movies: IMovie[];
}

const Movies = (props: IMovies) => {
    const { movies = []} = props;

    return (
        <div className="movies">
            {movies.length ?
                movies.map((movie) => (
                    <Movie key={movie.imdbID} {...movie}
                    />
                )) : (<h4>Nothing was found.</h4>)}
        </div>
    );
}


// Указываем, что searchMovies — это функция
// Movies.propTypes = {
//     searchMovies: PropTypes.func.isRequired,
// }

export { Movies };