import React from 'react';
// import {Movie} from './Movie.js';
import {Movie} from "./Movie.tsx";
// import PropTypes from "prop-types";

const Movies = (props) => {
    const { movies = []} = props;

    return (
        <div className="movies">
            {movies.length ?
                movies.map((movie) => (
                    <Movie key={movie.imdbID} {...movie}
                    />
                )) : (<h4>No movies found.</h4>)}
        </div>
    );
}


// Указываем, что searchMovies — это функция
// Movies.propTypes = {
//     searchMovies: PropTypes.func.isRequired,
// }

export { Movies };