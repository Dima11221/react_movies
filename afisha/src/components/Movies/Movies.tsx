// import React from 'react';
// import {Movie} from './Movie.js';
import {Movie} from "../Movie/Movie.tsx";
import {IMovie} from "../../types/Types.ts";
import style from './style.module.scss'
// import PropTypes from "prop-types";


interface IMovies {
    movies: IMovie[];
}

const Movies = (props: IMovies) => {
    const { movies = []} = props;

    return (
        <div className={`${style.movieList} ${style.flex}`}>
            {movies.length ?
                movies.map((movie) => (
                    <Movie key={movie.imdbID} {...movie}
                    />
                )) : (<h4>Ничего не нашлось, либо вы ввели название неправильно</h4>)}
        </div>
    );
}


// Указываем, что searchMovies — это функция
// Movies.propTypes = {
//     searchMovies: PropTypes.func.isRequired,
// }

export { Movies };